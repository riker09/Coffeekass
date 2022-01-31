import { Store } from './base';

interface LoginModal extends Object {
  visible: boolean;
}

class LoginModalStore extends Store<LoginModal> {
  protected data(): LoginModal {
    return {
      visible: false,
    };
  }

  open () {
    this.state.visible = true;
  }

  show () {
    this.state.visible = true;
  }

  close () {
    this.state.visible = false;
  }

  hide () {
    this.state.visible = false;
  }
}

export const loginModalStore: LoginModalStore = new LoginModalStore()