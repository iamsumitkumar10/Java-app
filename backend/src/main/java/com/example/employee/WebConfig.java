package com.example.employee;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow frontend requests from 'http://localhost:3000'
        registry.addMapping("/api/**")  // Match all /api endpoints
                .allowedOrigins("http://localhost:3000")  // Allow only frontend on port 3000
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow necessary HTTP methods
                .allowCredentials(true);  // Allow sending credentials (cookies, authentication)
    }
}
