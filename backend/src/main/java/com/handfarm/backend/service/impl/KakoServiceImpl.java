package com.handfarm.backend.service.impl;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class KakoServiceImpl implements KakaoService {
    private UserRepository userRepository;

    private String cliend_id = "115759604dfe8a9071598cf92c78fc6d";

    @Autowired
    KakoServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public String[] getKakaoAccessToken (String code ) throws IOException{                // 로그인 시도 서비스
        String[] res = new String[2];
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+cliend_id); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:3000/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            res[0] = access_Token;
            res[1] = refresh_Token;
            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return res;
    }

    public Map<String,Object> createKakaoUser(String accessToken) {                 // 회원가입 및 값 리턴
        Map<String, Object> resultMap = new HashMap<>();
        String nickname = "k";
        //access_token을 이용하여 사용자 정보 조회

        try{
            JsonElement element = (JsonElement)GetUserInfo(accessToken);
            String id = element.getAsJsonObject().get("id").getAsString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            String email = "";
            if(hasEmail){
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            }

            nickname += id; // DB에 저장할 임시 닉네임
            String deviceNo = null;

            // DB조회해서 기존 회원인지 찾기
            Optional<UserEntity> userEntityOptional = userRepository.findByUserId(email);
            System.out.println("userEntity : " + userEntityOptional);
            // 존재하지 않으면 -> 회원가입
            if(!userEntityOptional.isPresent()){
                UserEntity userEntity = UserEntity.builder()
                        .userId(email)
                        .userNickname(nickname)
                        .build();
                userRepository.save(userEntity);
                resultMap.put("isRegisted", false);
            }else{ // 회원인 상태 -> 바로 로그인
                resultMap.put("isRegisted", true);
                nickname = userEntityOptional.get().getUserNickname();
                if(userEntityOptional.get().getDevice() != null){
                    deviceNo = userEntityOptional.get().getDevice().getDeviceNo();
                }
            }
            resultMap.put("userId", email);
            resultMap.put("userNickname", nickname);
            resultMap.put("deviceNo", deviceNo);
        }catch (IOException e){
            e.printStackTrace();
            resultMap.put("error" , "timeOut");
        }
        return resultMap;
    }

    @Override
    public String decodeToken(String accessToken)  { // 엑세스토큰으로 닉네임 찾기
        String decodeId = "";
        try{
            JsonElement element = (JsonElement)GetUserInfo(accessToken);
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            if(hasEmail){
                decodeId = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            }
            return decodeId;
        } catch (IOException e) {
            e.printStackTrace();
            return "timeOut";
        }
    }


    @Override
    public JsonElement GetUserInfo(String accessToken) throws IOException { // 사용자 정보 가져오기
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }


            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            br.close();

            return element;
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    @Override
    public String CheckRefreshToken(String refreshToken)  {              // 리프레시 토큰 체크
        String access_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=refresh_token");
            sb.append("&client_id="+cliend_id);
            sb.append("&refresh_token=" + refreshToken);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();

            System.out.println("access_token : " + access_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            return "timeOut";
        }
        return access_Token;
    }

    @Override
    public String KakaoLogout(String accessToken) throws IOException {
            String reqURL = "https://kapi.kakao.com/v1/user/logout";

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                conn.setRequestProperty("Authorization", "Bearer " + accessToken);

                //결과 코드가 200이라면 성공
                int responseCode = conn.getResponseCode();
                System.out.println("responseCode : " + responseCode);

                //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line = "";
                String result = "";

                while ((line = br.readLine()) != null) {
                    result += line;
                }
                System.out.println("response body : " + result);

                //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
                JsonParser parser = new JsonParser();
                JsonElement deleteelement = parser.parse(result);

                System.out.println(deleteelement);

                br.close();
            } catch (IOException e) {
                e.printStackTrace();
                return "timeOut";
            }
        return "Logout Sucess";

    }
    @Override
    public Boolean CheckAccessToken(String accessToken) throws IOException {
        String reqURL = "https://kapi.kakao.com/v1/user/access_token_info";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            System.out.println(element);

            br.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;

    }
    @Override
    public Boolean KakaoUnlink(String accessToken) throws IOException {
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
//
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            System.out.println(element);

            br.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
