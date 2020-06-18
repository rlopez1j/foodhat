import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

/**
 * TODO:
 * might need a highlight state to know when to highlight and when not to
 * ^ 1) could be determined by the touched attr, or the empty val which could
 * 2) be its own state rather than have a 'highlight' state
 * ^ would be couples with availableUsername || invalid username??
 **/

const CreateUserNameComponent = ({isUsernameAvailable, checkUsernameAvailability, setUsername}) => {
  const [validated, setValidated] = useState(false)


  /* maybe do validation or rely on a frontend library like bootstrap
  * might need to create regex of what is allowed and what isn't
  * check for username availability
  * if available turn input highlight greeen and show/enable create username button
  * */
  const validateUsername = (keyPressEvent) => {
    const keyPressed = keyPressEvent.target.value
    console.log('key', keyPressed)
    setValidated(true)
  }

  return (
    <Form noValidate validated={validated}>
      <Form.Row>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              onChange={validateUsername}
              type="text"
              placeholder="Type username..."
              required
            />
            <Form.Control.Feedback type="invalid">
              Username needs to be [requirements]
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      { validated &&
        <div >
        <Button
          variant='primary'
          onClick={setUsername}>
          Create Username
        </Button>      
        </div>
      }
    </Form>
  )

}

export default CreateUserNameComponent