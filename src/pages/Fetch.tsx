import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import FetchContainer from '../components/FetchContainer';
import './Fetch.css';
const logo = "../../assets/blocks.png"
declare const window: any;

const Fetch: React.FC = () => {
    const history = useHistory();

    const onHome = () => {
        history.replace("/home");
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle slot="start">
            <img className="logo" src={logo} />
          </IonTitle>
          <IonButton size="small" color="danger" className="btn" slot="end" onClick={onHome}>Home</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark">
        <FetchContainer />
      </IonContent>
    </IonPage>
  );
};

export default Fetch;