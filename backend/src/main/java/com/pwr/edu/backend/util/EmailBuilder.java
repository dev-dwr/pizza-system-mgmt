package com.pwr.edu.backend.util;

import com.pwr.edu.backend.domain.pizza.Status;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class EmailBuilder {
    public String buildEmail(String name, String link) {
        try {
            Resource resource = new ClassPathResource("static/registration.html");
            InputStream inputStream = resource.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder builder = new StringBuilder();
            String line;
            while((line = bufferedReader.readLine()) != null){
                builder.append(line);
            }
            String builderToString = builder.toString();
            builderToString = builderToString.replaceFirst("%NAME%", name);
            builderToString = builderToString.replaceFirst("%LINK%", link);
            return builderToString;
        } catch (IOException io) {
            System.out.println(io.getMessage());
            return "cannot send email";
        }
    }
    public String changedStatusEmail(Status updatedStatus){
        try {
            Resource resource = new ClassPathResource("static/changed_status.html");
            InputStream inputStream = resource.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder builder = new StringBuilder();
            String line;
            while((line = bufferedReader.readLine()) != null){
                builder.append(line);
            }
            String builderToString = builder.toString();
            builderToString = builderToString.replaceFirst("%STATUS%", updatedStatus.name());
            return builderToString;
        } catch (IOException io) {
            System.out.println(io.getMessage());
            return "cannot send email";
        }
    }
}
