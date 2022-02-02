import { collection, query, onSnapshot } from 'firebase/firestore';
import { ref, Ref } from 'vue';
import { IPerson } from '../interfaces/i-person';
import { firestore as db } from './Firebase';

export class PeopleService {

  private _people: Ref<IPerson[]> = ref<IPerson[]>([]);

  constructor () {
    const q = query(collection(db, 'person'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this._people.value.splice(0);
      querySnapshot.forEach((doc) => {
        const p = doc.data() as IPerson;
        p.id = doc.id;
        this._people.value.push(p);
      });
    });
  }

  get people () {
    return this._people.value;
  }
}

const peopleService = new PeopleService();

export default peopleService;