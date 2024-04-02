import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";
import { deleteContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
//   `  // full name 저장 (input 태그 id 추가할 것)
//     var full = document.getElementById('first').value + " " + 
//                 document.getElementById('last').value;
//     formData.append('full', full);`
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  console.log(contact);
  return (
    <>
    <Form method="post" id="contact-form">      
      <p>    
        <span>Name</span>
        <input
          id="first"
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          id="last"
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      {/* 신규 추가, 수정 하기 구분 위해 hiddn input*/}
      <input name="edit" type="hidden" defaultValue="edit" style={{ display: "none" }}/>             
      <p>
        <button type="submit">Save</button>
        <button onClick={async ()=>{
            if(contact.edit != "edit"){ 
                await deleteContact(contact.id);
            }
            navigate("/")
        }}>Cancel</button>
      </p>    
    </Form>
   
    </>
  );
}