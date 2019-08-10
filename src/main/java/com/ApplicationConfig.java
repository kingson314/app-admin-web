package com;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
@Configuration
public class ApplicationConfig extends WebMvcConfigurationSupport {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /*
        * 说明：增加虚拟路径(经过本人测试：在此处配置的虚拟路径，用springboot内置的tomcat时有效，
        * 用外部的tomcat也有效;所以用到外部的tomcat时不需在tomcat/config下的相应文件配置虚拟路径了,阿里云linux也没问题)
        */
//        //Windows下
//        registry.addResourceHandler("/uploads2/**").addResourceLocations("file:D:/uploads2/");
        //Mac或Linux下(没有CDEF盘符)
//        registry.addResourceHandler("/uploads/**").addResourceLocations("file:/Users/liuyanzhao/Documents/uploads/");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:/Volumes/Docs/Git/nginx/uploads/");
        super.addResourceHandlers(registry);
        
    }
}