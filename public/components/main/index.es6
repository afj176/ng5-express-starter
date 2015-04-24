import {Component, NgElement, View, bootstrap, For} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {Contact} from 'components/contact/Contact';


@Component({
  selector: 'main'
})
@View({
  templateUrl: 'components/main/templates/main.html',
  directives: [Contact]
})
class Main {

  domElement: any;
  doneLoading: any;
  isContactVisible: any;
  showContactText: string;
  constructor(el: NgElement) {
    this.domElement = el.domElement;
    var persons = ["Pal", "Friend", "Amigo", "Buddy"];
    this.person = persons[Math.floor(Math.random() * persons.length)]
    this.doneLoading = true;
    this.isContactVisible = false;
    this.showContactText = "Show Contact";
  }

  showContact(e){
    var contactText = "";
    e.preventDefault();
    this.isContactVisible = !this.isContactVisible;
    if(this.isContactVisible){
      contactText = "Hide Contact";
    }else{
      contactText = "Show Contact";
    }
    this.showContactText = contactText; 
  }

}

bootstrap(Main);