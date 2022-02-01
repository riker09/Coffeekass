import { Store } from './base';
import { auth } from '../service/Firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Auth extends Object {
  user: User | null;
}

class AuthStore extends Store<Auth> {
  private initialized = false;

  constructor () {
    super();

    onAuthStateChanged(auth, (user) => {
      this.state.user = user;
      this.initialized = true;
    });
  }

  protected data(): Auth {
    return {
      user: null,
    };
  }

  async init () {
    if (this.initialized) return;

    const MAX_WAIT_ON_INIT_IN_MS = 2000;

    // Factory method: Returns a promise that resolves when store is initialized and rejects after ms
    const isInitialized = (ms: number) => new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if (this.initialized) { resolve(true); }
        else reject();
      }, ms);
    });

    // backoff: Array with values in ms after which the auth store is checked again
    const backoff = [10, 20, 50, 100, 200, 500, 1000, 1800];
    const tests = backoff.map(b => isInitialized(b));

    const now = Date.now();
    const result = await Promise.any(tests.concat([
      new Promise<boolean>((resolve, reject) => { setTimeout(() => resolve(false), MAX_WAIT_ON_INIT_IN_MS); }), // Resolve negative after 2.000 ms
    ]));
    console.debug(`Auth store init complete after ${Date.now() - now}ms; Successful: ${result}`);
  }

  logout () {
    return auth.signOut();
  }

  get user () {
    return this.state.user;
  }

  get uid () {
    return this.state.user?.uid;
  }

  get authenticated (): boolean {
    return !!this.state.user?.uid && this.state.user?.uid !== '';
  }
}

export const authStore: AuthStore = new AuthStore()