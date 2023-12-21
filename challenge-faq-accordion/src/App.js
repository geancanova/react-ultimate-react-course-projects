import { useState } from "react";

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payments via credit/debit cards, PayPal, and bank transfers.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is processed, you'll receive a tracking number via email. You can use this number on our website to track your package.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be unused and in their original packaging. Please refer to our Returns page for more details.",
  },
  {
    question: "How do I change my account password?",
    answer:
      "You can change your password by logging into your account, navigating to the settings, and selecting the 'Change Password' option. Follow the instructions to update your password.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we provide international shipping to most countries. Shipping fees and delivery times may vary based on the destination. Please check our shipping information for more details.",
  },
  {
    question: "What should I do if an item is out of stock?",
    answer:
      "If an item is out of stock, you can sign up for notifications to receive an alert when it becomes available again. Alternatively, you can contact our customer service for further assistance.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team by emailing support@example.com or calling our toll-free number at XXX-XXX-XXXX during business hours.",
  },
  {
    question: "Are there any discounts for bulk orders?",
    answer:
      "Yes, we offer discounts for bulk orders. Please contact our sales team with details of your order for pricing and discount information.",
  },
  {
    question: "Can I cancel my order after it's been placed?",
    answer:
      "You may cancel your order within 24 hours of placing it. Contact our support team immediately with your order details to request cancellation.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "Our products come with a standard one-year warranty against manufacturing defects. Please refer to our warranty page for specific details regarding product warranties.",
  },
];

export default function App() {
  const [items, setItems] = useState(faqData);
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleAddItem(item) {
    setItems([...items, item]);
    handleCloseModal();
  }

  return (
    <div className="container">
      <Box>
        <h1>FAQs</h1>
        <FaqList data={items} />
      </Box>
      <Button onClick={handleShowModal}>Add question</Button>
      {showModal && (
        <Modal title="Add a Question" onClose={handleCloseModal}>
          <Form onAddItem={handleAddItem} />
        </Modal>
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function FaqList({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <ul className="faq-list">
      {data.map((item, i) => (
        <FaqItem
          item={item}
          num={i}
          curOpen={curOpen}
          onOpen={setCurOpen}
          key={i}
        />
      ))}
    </ul>
  );
}

function FaqItem({ item, num, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <li className="faq-item">
      <div className="faq-header" onClick={handleToggle}>
        <h3>{item.question}</h3>
        {!isOpen && <img src="assets/icon-plus.svg" alt="open" />}
        {isOpen && <img src="assets/icon-minus.svg" alt="close" />}
      </div>
      {isOpen && (
        <div className="faq-content">
          <p>{item.answer}</p>
        </div>
      )}
    </li>
  );
}

function Form({ onAddItem }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { question, answer };

    onAddItem(newItem);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label>Answer</label>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button>Submit</Button>
    </form>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal">
      <Box>
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <span onClick={onClose}>✖</span>
        </div>
        {children}
      </Box>
    </div>
  );
}
