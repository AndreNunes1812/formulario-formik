import React, { useState } from 'react';
import { Form, Input, FileInput } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().when('$updatePassword', {
    is: true,
    then: Yup.string()
      .min(4)
      .required(),
    otherwise: Yup.string().strip(true),
  }),
  attach: Yup.string()
});

function App() {
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateAttach, setUpdateAttach] = useState('');
  

  const initialData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    attach: 'sdsd'
  };

  function handleProgress(progress, event) {
    console.log('Evento:',event.target.result)
    setUpdateAttach(event.target.result)
  }

  function handleSubmit(data) {
    console.log('Data:', data)
  }

  return (
    <Form
      schema={schema}
      initialData={initialData}
      context={{ updatePassword, updateAttach }}
      onSubmit={handleSubmit}
    >
      <Input name="name" /><br/>
      <Input name="email"/><br/>

      <input
        type="checkbox"
        name="Update Password"
        checked={updatePassword}
        onChange={e => setUpdatePassword(e.target.checked)}
      /><br/>

      <Input name="password" type="password" /><br/>

      <FileInput name="attach" onStartProgress={handleProgress} /><br/>

      <button type="submit">Save</button>

      <img src={updateAttach} 
           alt="Imagem" 
           height={150}
           width={150} />
    </Form>
  );
}
export default App;
