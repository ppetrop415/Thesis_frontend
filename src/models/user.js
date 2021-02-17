export default class User {
  constructor(email, password, password2, first_name, last_name, member) {
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.first_name = first_name;
    this.last_name = last_name;
    this.member = member;
  }
}
