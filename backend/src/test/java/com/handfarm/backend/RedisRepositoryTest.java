//package com.handfarm.backend;
//
//import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
//import com.handfarm.backend.domain.entity.ChatEntity;
//import com.handfarm.backend.domain.entity.ChatInfoEntity;
//import com.handfarm.backend.domain.entity.UserEntity;
//import com.handfarm.backend.repository.ChatInfoRepository;
//import com.handfarm.backend.repository.ChatRedisRepository;
//import com.handfarm.backend.repository.UserRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.redis.core.ListOperations;
//import org.springframework.data.redis.core.RedisTemplate;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@SpringBootTest
////@Disabled
//public class RedisRepositoryTest {
//
//    private final ChatInfoRepository chatInfoRepository;
//    private final ChatRedisRepository chatRedisRepository;
//    private final RedisTemplate<String, ChatEntity> redisTemplate;
//    private final UserRepository userRepository;
//
//
//    @Autowired
//    RedisRepositoryTest(ChatInfoRepository chatInfoRepository, ChatRedisRepository chatRedisRepository, RedisTemplate<String, ChatEntity> redisTemplate, UserRepository userRepository){
//        this.chatInfoRepository = chatInfoRepository;
//        this.chatRedisRepository = chatRedisRepository;
//        this.redisTemplate = redisTemplate;
//        this.userRepository = userRepository;
//    }
//
//    @Test
//    void 채팅보내기(){
//        String decodeId = "da9065@naver.com";
//        String toUserNickname = "k2502031290";
//        String content = "제발 되어주라............";
//
//        UserEntity personA = userRepository.findByUserId(decodeId).get();
//        UserEntity personB = userRepository.findByUserNickname(toUserNickname).get();
//        Integer roomId;
//        Optional<ChatInfoEntity> chatInfoEntity = chatInfoRepository.findByPersonAOrPersonB(personA, personB);
//        if(chatInfoEntity.isPresent()){ // 이미 있는 채팅, 채팅방 번호 가져와서 레디스에 연결
//            roomId = chatInfoEntity.get().getIdx();
//            System.out.println("채팅 방 번호 : " + roomId);
//        }else{ // 없으면 새로운 채팅방 생성 후 채팅방 번호 가져오기
//            ChatInfoEntity chatInfo = new ChatInfoEntity(personA, personB);
//            chatInfoRepository.save(chatInfo);
//            roomId = chatInfo.getIdx();
//            System.out.println("채팅 방 번호 : " + roomId);
//        }
//
//        ChatEntity chat = new ChatEntity(String.valueOf(roomId), personB.getUserId(), content, LocalDateTime.now());
//        redisTemplate.opsForList().leftPush(String.valueOf(roomId),chat);
//    }
//
//    @Test
//    void 사용자_채팅목록_조회(){
//        String decodeId = "aa981204@daum.net";
//
//        List<ChatListViewDto> chatList = new ArrayList<>();
//
//        UserEntity user = userRepository.findByUserId(decodeId).get();
//        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);
//
//        if(!chatInfoList.isEmpty()){
//            for(ChatInfoEntity c : chatInfoList){
//                String roomId = String.valueOf(c.getIdx());
//                ChatEntity chatInfo = redisTemplate.opsForList().index(roomId, 0);
//                ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));
//
//                UserEntity personA = chatRoomInfo.getPersonA();
//                UserEntity personB = chatRoomInfo.getPersonB();
//                if(personA.getUserId().equals(decodeId)){
//                    chatList.add(new ChatListViewDto(personB.getUserNickname(), personB.getUserProfile(),chatInfo.getContent(), chatInfo.getTime()));
//                }else{
//                    chatList.add(new ChatListViewDto(personA.getUserNickname(), personB.getUserProfile(),chatInfo.getContent(), chatInfo.getTime()));
//                }
//            }
//
//        }
//
//        for(ChatListViewDto c : chatList){
//            System.out.println(c.toString());
//        }
//    }
//
//    @Test
//    void 채팅상세조회(){
//        String decodeId = "aa981204@daum.net";
//        String roomId = "6";
//
//        List<ChatEntity> chat = redisTemplate.opsForList().range(roomId , 0, redisTemplate.opsForList().size(roomId));
////        System.out.println(chat);
//
////        chat.stream().forEach(chatEntity -> System.out.println());
//
//        for(int i=0; i<chat.size(); i++){
//            System.out.println(chat.get(i));
//        }
//
//
//    }
////    @Test
////    void 첫_채팅(){
////        String decodeId = "tkdltprp0212@naver.com";
////
////        Integer roomId = 16;
////        String toUserId = "swyou1123@naver.com";
////        String content = "Redis 저장 테스트";
////        String redisKey = decodeId + ","+toUserId;
////
////        ChatEntity chat = new ChatEntity(redisKey, roomId, toUserId, content, LocalDateTime.now());
////        chattRedisRepository.save(chat);
//////        redisTemplate.opsForHash().put("chatList",redisKey,chat);
////    }
////    @Test
////    void 채팅보내기테스트(){
////        ListOperations<String, Object> stringObjectListOperations = redisTemplate.opsForList();
////        // given
////        String decodeId = "kiki249@naver.com";
////
////        Integer roomId = 12;
////        String toUserId = "swyou1123@naver.com";
////        String content = "ddddd..";
////        String redisKey = decodeId+","+ toUserId;
////        ChatEntity chat = new ChatEntity(redisKey,roomId, toUserId, content, LocalDateTime.now());
////
////
//////        String keyName = "chatList:"+redisKey;
////        redisTemplate.opsForList().leftPush(redisKey,chat);
//////        redisTemplate.expireAt(redisKey, Date.from(ZonedDateTime.now().plusDays(30).toInstant())); // 유효기간 TTL 30일
////
//////        stringObjectListOperations.leftPush(redisKey,chat);
////
////    }
////
////    @Test
////    void 사용자_채팅_목록_조회(){
////        String decodeId = "aa981204@daum.net";
////        String redisKey = decodeId+","+"swyou1123@naver.com";
////        UserEntity user = userRepository.findByUserId(decodeId).get();
////        String userNickname = user.getUserNickname();
////
////
////
////        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
////        System.out.println("대화 Size : " + listOperations.size(redisKey));
////        List<Object> chatDetails = listOperations.range(redisKey,0, listOperations.size(redisKey));
////        for(Object c :  chatDetails){
////            System.out.println(c.toString());
////        }
////    }
//}
