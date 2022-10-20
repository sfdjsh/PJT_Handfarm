package com.handfarm.backend.controller;

import com.handfarm.backend.service.UserService;
import com.handfarm.backend.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class FarmController {
    @Autowired
    UserServiceImpl userService;

    @ResponseBody
    @GetMapping("/kakao")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        String access_token = userService.getKakaoAccessToken(code);
        userService.createKakaoUser(access_token);
    }
}
