package com.michal.memetactoe.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    @GetMapping("/user")
    public String getUserName(Principal principal){
        return principal.getName();
    }
}
