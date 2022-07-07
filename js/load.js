const createLoader = (onSuccess, onError) => async () => {
  try {
    const res = await (await fetch('https://26.javascript.pages.academy/kekstagram/data'));
    if (res.ok) {
      const jsonRes = await res.json()
      onSuccess(jsonRes);
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } catch (err) {
      onError(err);
    }
  }

  export {createLoader};



