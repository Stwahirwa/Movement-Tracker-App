import { useState, useEffect } from "react";
import * as Location from "expo-location/build/Location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  console.log(subscriber);

  const startWatching = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      console.log('status is', status)
     
      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback()
      );
      setSubscriber(sub);
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      //stop watching
      subscriber.remove();
      console.log("Subscriber Removed");
      setSubscriber(null);
    }
  }, [shouldTrack]);

  return [err];
};
