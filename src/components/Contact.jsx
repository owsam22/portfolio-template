import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, message: '' });
    const isSuccess = status.message.includes('successfully');
    const isError = status.message.includes('Oops!');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, message: '' });

        const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

        try {
            await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: new FormData(e.target)
            });

            // When using no-cors, the response is opaque, so we can't check response.ok
            // If the fetch doesn't throw a network error, we assume it was successful.
            setStatus({
                loading: false,
                message: 'Thank you! Your message has been sent successfully. 🎉'
            });
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus({ loading: false, message: '' });
            }, 5000);
        } catch (error) {
            console.error('Error!', error.message);
            setStatus({
                loading: false,
                message: 'Oops! Something went wrong. Please try again later. ❌'
            });
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="contact-subtitle">
                    Have a project in mind? Let's work together to create something amazing!
                </p>

                <form className="contact-form glass-card" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="6"
                            required
                            className="form-input"
                        ></textarea>
                    </div>

                    <div className="submit-btn-wrapper">
                        <button
                            type="submit"
                            className={`contact-submit-btn ${status.loading ? 'is-sending' : ''} ${isSuccess ? 'is-sent' : ''}`}
                            disabled={status.loading}
                        >
                            <span className="contact-submit-label">
                                {status.loading ? 'Sending...' : isSuccess ? 'Sent' : isError ? 'Try Again' : 'Send Message'}
                            </span>
                            <span className="contact-submit-icon" aria-hidden="true">
                                {status.loading ? <span className="spinner" /> : isSuccess ? <span className="checkmark">✓</span> : isError ? <span className="retry-icon">↺</span> : <span className="arrow-icon">→</span>}
                            </span>
                        </button>
                    </div>

                    {status.message && (
                        <div className="form-message success">
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
