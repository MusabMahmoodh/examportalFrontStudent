import React from "react";
import { Form, Button } from "react-bootstrap";
const SubscriptionSelector = ({
  subscriptions,
  setSelectedSubscription,
  selectedSubscription,
}) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect2">
      <Form.Label>Slect Subject</Form.Label>
      <Form.Control
        as="select"
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
      >
        <option value="0" disabled>
          Select subscription
        </option>
        {subscriptions &&
          subscriptions.map((sub) => (
            <option value={sub._id} key={sub._id}>
              {sub.name}
            </option>
          ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SubscriptionSelector;
