package com.michal.memetactoe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(String username, String password){

        if(userRepository.findByUserName(username)==null) {
            User newUser = new User();
            newUser.setUserName(username);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setEnabled(1);
            newUser.setUserRole("ROLE_USER");
            userRepository.save(newUser);
        }
    }
}
