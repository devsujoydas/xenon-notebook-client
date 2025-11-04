import { motion } from "framer-motion";
import { FileText, Lock, Cloud, Star } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText size={32} className="text-indigo-600" />,
      title: "Organize Notes",
      description: "Keep all your notes neatly organized with categories, tags, and notebooks.",
    },
    {
      icon: <Lock size={32} className="text-indigo-600" />,
      title: "Secure & Private",
      description: "Your notes are encrypted and stored securely, giving you full privacy.",
    },
    {
      icon: <Cloud size={32} className="text-indigo-600" />,
      title: "Cloud Sync",
      description: "Access your notes from any device with real-time cloud synchronization.",
    },
    {
      icon: <Star size={32} className="text-indigo-600" />,
      title: "Easy-to-use",
      description: "Clean and intuitive design helps you focus on your thoughts, not the app.",
    },
  ];

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="w-main mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-indigo-700"
        >
          Why Choose Xenon Notebook?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Xenon Notebook is designed to make your life easier. From organizing your ideas to accessing them anytime, our features help you stay productive and secure.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
