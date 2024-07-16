import firebase from 'firebase/compat/app';

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";

class FirebaseAuthBackend {
  constructor(firebaseConfig : any) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          sessionStorage.setItem("authUser", JSON.stringify(user));
        } else {
          sessionStorage.removeItem("authUser");
        }
      });
    }
  }

  /**
   * Registers the user with given details
   */
  registerUser = (email : any, password : any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email : any, password : any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Login user with given details
   */
  loginUser = (email : any, password : any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  forgetPassword = (email :any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return true; // Resolves with a boolean value of true on success
      })
      .catch(error => {
        throw this._handleError(error); // Throws an error object with a message property on failure
      });
  };

  /**
   * Social Login user with given details
   */
  socialLoginUser = async (type: any) => {
    let provider: firebase.auth.AuthProvider | null = null;
    if (type === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (type === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    }
    if (provider) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        return user;
      } catch (error : any) {
        throw this._handleError(error);
      }
    }
    throw new Error(`Invalid social login type: ${type}`);
  };

  addNewUserToFirestore = (user : any) => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    };
    collection.doc(firebase.auth().currentUser!.uid).set(details);
    return { user, details };
  };

  setLoggeedInUser = (user: firebase.User)  => {
    sessionStorage.setItem("authUser", JSON.stringify(user));
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = (): firebase.User | null => {
    const authUser = sessionStorage.getItem("authUser");
    if (!authUser) return null;
    return JSON.parse(authUser);
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error: firebase.auth.Error): string {
    return error.message;
  }
}
  

let _fireBaseBackend: FirebaseAuthBackend | null = null;

const initFirebaseBackend = (config: any): FirebaseAuthBackend => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

const getFirebaseBackend = (): FirebaseAuthBackend | null => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };