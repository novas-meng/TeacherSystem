package com.TeacherSystem.action;

import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by novas on 15-10-23.
 */
public class FirstAction extends ActionSupport
{
    private String message;
    @Override
    public String execute() throws Exception {
        message="novas";
        return ERROR;
    }
}
