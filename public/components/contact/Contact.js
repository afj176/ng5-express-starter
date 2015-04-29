import {Component, View, Decorator} from 'angular2/angular2';
import {FormBuilder, Validators, FormDirectives, ControlGroup} from 'angular2/forms';
import {Promise} from 'angular2/src/facade/async';

@Component({
  selector: 'contact',
  properties: {
    "fullName" : "fullName",
    "emailAddress" : "emailAddress",
    "description" : "description"
  },  
  injectables: [FormBuilder]
})
@View({
  templateUrl: 'components/contact/templates/contact.html',
  directives: [FormDirectives]
})
export class Contact {
  form: ControlGroup;
  builder: FormBuilder;
  message: string;
  constructor(b:FormBuilder) {
    this.builder = b;
    this.form = b.group({
        "fullName" : ["", Validators.required],
        "emailAddress" : ["", Validators.required],
        "description" : ""
    });
    this.message = "Information below updates as you type."
  }

  post(url: string, message: any): Promise {

    return new Promise(function(resolve, reject) {
      
      var req = new XMLHttpRequest();
      req.open("POST", url);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      req.onload = function() {
        if (req.status == 200) {
          resolve(JSON.parse(req.response));
        } else {
          reject(Error(JSON.parse(req.response).message));
        }
      };

      req.onerror = function() {
        reject(Error(JSON.parse(req.response).message));
      };

      req.send(JSON.stringify({"message": message}));
    });
  }

  sendMessage(url: string, message: any):Promise {
    var promise = this.post(url, message);
    return promise;
  }

  submitContact(e) {
    e.preventDefault();
    console.log("Submitting contact form");
    console.log("form values: ", this.form.value);
    if(this.form.errors !== null){
      console.log("this.form.errors", this.form.errors);
      if(this.form.errors.required){
        this.message = "please fill in required fields";  
        return;
      }
    }else if(this.form.valid){
      console.log("this.form.valid", this.form.valid)
      this.sendMessage("/contact", this.form.value ).then((data) => {
        this.message = data.message;
        console.log("/contact data msg: ", this.message);
      }, (error) => {
        this.message = error.message;
        console.log("/contact error msg: ", this.message);
      });      
    }
  }

}