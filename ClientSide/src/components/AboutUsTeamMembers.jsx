import React from 'react';

const teamMembers = [
  {
    name: 'Rishav Karna',
    role: 'Backend Developer',
    bio: 'Passionate about crafting sleek and responsive interfaces.',
    image: '../src/assets/about-us/rishav.jpeg',
  },
  {
    name: 'Sumit Khadka',
    role: 'Full Stack Developer',
    bio: 'Loves building scalable APIs and working with databases.',
    image: '../src/assets/about-us/sumit.jpg',
  },
  {
    name: 'Anjesh Mainali',
    role: 'Backend Developer',
    bio: 'Designs user-first experiences that are both functional and beautiful.',
    image: '../src/assets/about-us/Anjesh.jpeg',
  },
  {
    name: 'Rijan Budhathoki',
    role: 'Frontend Developer',
    bio: 'Keeps the team aligned and projects on track with agile methodologies.',
    image: '../src/assets/about-us/rijan.jpeg',
  },
  {
    name: 'Lokendra Nath',
    role: 'Frontend Developer',
    bio: 'Ensures the app works smoothly through rigorous testing.',
    image: '../src/assets/about-us/lokendra.jpeg',
  },
];

const AboutUsTeamMembers = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">Our Amazing Team</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Each member brings unique skills and perspectives, working together to deliver exceptional results.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsTeamMembers;
