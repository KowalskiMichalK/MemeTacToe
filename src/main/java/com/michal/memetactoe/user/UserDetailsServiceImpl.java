package com.michal.memetactoe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private  UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName);
        if (null == user){
            throw new UsernameNotFoundException("no user present with username: " + userName);
        }else{
            return new UserDetailsImpl(user);
        }
    }
}
