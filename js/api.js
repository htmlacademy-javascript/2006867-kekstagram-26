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

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {createLoader, sendData};
