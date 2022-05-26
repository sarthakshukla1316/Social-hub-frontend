import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export const useLoadingWithRefresh = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
          try {
            const { data } = await axios.get('https://socialhubb.herokuapp.com/api/refresh', {
                withCredentials: true,
            });

            dispatch(setAuth(data));
            setLoading(false);

          } catch(err) {
            // console.log(err);
            setLoading(false);
          }

      })();
    }, [])

    return { loading };
    
}