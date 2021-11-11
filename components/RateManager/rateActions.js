import firebase, { ROOT_URL } from "../../firebase/firebase";
import Axios from "axios";
import md5 from "md5";
import keys from "../../config/keys";
import cuid from "cuid";
import axios from "axios";
import { reject } from "lodash";
import { resolveHref } from "next/dist/next-server/lib/router/router";
import { newObjWithMetrics } from "../../reducers/dropReducer";
import { setDoc } from "../../firebase/firebaseActions";

const firestore = firebase.firestore();

export const getVibesForSignedInUser = async () => {
  try {
    let itemDocs = await firestore
      .collection("vibe_of_user")
      .where("userUid", "==", firebase.auth().currentUser.uid)
      .get();
    let results = [];

    itemDocs.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (error) {
    console.log("error get vibes for user ", error);
    throw Error(error.message);
  }
};

export const getObjectivesForSignedInUser = async () => {
  try {
    let itemDocs = await firestore
      .collection("objective_of_user")
      .where("userUid", "==", firebase.auth().currentUser.uid)
      .get();
    let results = [];

    itemDocs.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    console.log("get objectives for signed in user", results);

    return results;
  } catch (error) {
    console.log("error creating new item", error);
  }
};

export const updateItemRatingsForUser = async (items) => {
  try {
    let promises = [];

    items.forEach((item) => {
      const itemPromise = new Promise(async (resolve, reject) => {
        try {
          await setDoc("item_of_user", item.id, item);

          resolve(true);
        } catch (error) {
          reject(error.message);
          return error.message;
        }
      });
      promises.push(itemPromise);
    });

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.log("error updating batch items", error);
    throw Error(error.message);
  }
};

export const createBatchItemsForVibe = async (
  items,
  vibeId,
  metrics,
  displayNameKey,
  authUid
) => {
  try {
    let promises = [];
    let newItems = [];
    items.forEach((item) => {
      const itemPromise = new Promise(async (resolve, reject) => {
        try {
          let newObj = newObjWithMetrics(
            item[`${displayNameKey}`] || item.displayName || item.Name,
            metrics,
            vibeId
          );
          newObj.userUid = authUid;
          let compoundId = `${item.id}_${authUid}`;

          newObj = Object.assign(newObj, item);
          newObj.id = compoundId;
          await setDoc("item_of_user", compoundId, newObj);
          newItems.push(newObj);
          resolve(true);
        } catch (error) {
          reject(error.message);
          return error.message;
        }
      });
      promises.push(itemPromise);
    });

    await Promise.all(promises);
    return newItems;
  } catch (error) {
    console.log("error creating batch items", error);
    throw Error(error.message);
  }
};

export const createNewItem = async (obj) => {
  try {
    let itemId = cuid();
    let userUid = firebase.auth().currentUser.uid;
    let id = `${itemId}_${userUid}`;
    obj.itemId = itemId;
    obj.userUid = userUid;
    await firestore.collection("item_of_user").doc(id).set(obj);

    return { id: id, ...obj };
  } catch (error) {
    console.log("error creating new item", error);
  }
};

export const createNewVibeForSignedInUser = async (obj) => {
  try {
    let vibeId = cuid();
    let userUid = firebase.auth().currentUser.uid;
    let uItem = Object.assign(obj, {
      userUid,
      vibeId,
      metrics: [
        {
          displayName: "metric1",
          weight: 0.8,
          positive: true,
          color: "#FF7F50", //coral
          metricId: cuid(),
        },
        {
          displayName: "metric2",
          weight: 0.6,
          positive: true,
          color: "#DDA0DD", //plum
          metricId: cuid(),
        },
      ],
      createdAt: Date.now(),
    });
    await firestore
      .collection("vibe_of_user")
      .doc(`${vibeId}_${userUid}`)
      .set(uItem);
    uItem.id = `${vibeId}_${userUid}`;
    return uItem;
  } catch (error) {
    console.log("error creating new vibe", error);
    throw Error(error.message);
  }
};

export const getRecordsFromAirtableForView = async (
  airtableKey,
  base,
  table,
  view
) => {
  try {
    const { data: recordData } = await axios.post(
      `${ROOT_URL}/airtableGetRecordsFromTable`,
      { base: base, view: view, airtableKey: airtableKey, table: table }
    );
    //TODO : pump these to firestore

    const { records } = recordData || [];
    return records;
  } catch (error) {
    console.log(
      `error getting prep records ${base} ${airtableKey} ${table} ${view} `,
      error
    );
    throw Error("error getting records", error.message);
  }
};
