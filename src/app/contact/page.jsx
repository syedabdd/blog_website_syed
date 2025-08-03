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
    const text = `New Message from Blog Contact Form:\n\n🧑 Name: ${name}\n📧 Email: ${email}\n📱 Phone: ${phone || 'Not Provided'}\n✉️ Message: ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/919570026142?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="relative px-6 py-28 text-white overflow-hidden bg-[var(--bgSoft)]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-[var(--accent)] opacity-20 blur-3xl rounded-full z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14">
        <motion.div
          className="flex-1 flex justify-center"
          variants={item}
          whileHover={{ rotate: 2, scale: 1.03 }}
        >
          <Image
            src="/images/contact.png"
            alt="Contact"
            width={500}
            height={500}
            className="rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>

        <motion.div className="flex-1 w-full" variants={item}>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl"
            variants={item}
          >
            <motion.h2 className="text-3xl font-bold text-[var(--accent)]" variants={item}>
              Let's Talk
            </motion.h2>

            {['name', 'email', 'phone'].map((field, i) => (
              <motion.input
                key={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={
                  field === 'name'
                    ? 'Name and Surname'
                    : field === 'email'
                    ? 'Email Address'
                    : 'Phone Number (Optional)'
                }
                required={field !== 'phone'}
                onChange={handleChange}
                className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--btn)]"
                variants={item}
              />
            ))}

            <motion.textarea
              name="message"
              rows={4}
              placeholder="Message"
              required
              onChange={handleChange}
              className="w-full bg-[#1f1f2e] text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[var(--btn)] resize-none"
              variants={item}
            ></motion.textarea>

            <motion.button
              type="submit"
              className="w-full bg-[var(--btn)] hover:bg-[var(--hover)] text-white py-3 rounded-md font-semibold transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: '0 0 16px rgba(255,108,3,0.5)' }}
              whileTap={{ scale: 0.97 }}
              variants={item}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}