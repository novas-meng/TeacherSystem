package com.TeacherSystem.action;

import com.opensymphony.xwork2.ActionSupport;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;

/**Acts as a Struts 2 controller that responds
 * to a user action by setting the value
 * of the Message model class, and returns a String result.
 * @author xdp
 * @since 2013-3-24
 * @version 1.0
 */
public class HelloWorldAction extends ActionSupport {
  //  private MessageStore msgStore;
    @Override
    public String execute() throws Exception {

       // msgStore = new MessageStore("HelloWorld!");
        return SUCCESS;
    }
   // public MessageStore getMsgStore() {
      //  return msgStore;
   // }
   // public void setMsgStore(MessageStore msgStore) {
     //   this.msgStore = msgStore;
   // }
}