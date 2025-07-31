'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = form;

    const text = `New Message from Blog Contact Form:

🧑 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || 'Not Provided'}
✉️ Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/919570026142?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section className=" text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Left: Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/contact.png"
            alt="Contact Illustration"
            width={500}
            height={500}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto rounded-3xl shadow-lg"
            priority
          />
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name and Surname"
              className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#ff6c03]"
              required
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#ff6c03]"
              required
              onChange={handleChange}
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number (Optional)"
              className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#ff6c03]"
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#ff6c03] resize-none"
              required
              onChange={handleChange}
            ></textarea>

            <motion.button
              type="submit"
              className="w-full bg-[#ff6c03] hover:bg-orange-500 text-white py-3 rounded-md transition-all duration-300 font-semibold"
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
