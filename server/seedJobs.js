import mongoose from "mongoose";
import { Job } from "./model/jobSchema.js"; // Update the path to your Job model
import dotenv from "dotenv";
dotenv.config();

// Replace with your MongoDB connection string
const mongoURL = process.env.MONGO_URL;

const userId = "66bc2638063324f3c035d866"; // Example user ID

const jobs = [
  {
    title: "Software Engineer",
    description:
      "As a Software Engineer at Tech Innovators Inc., you'll be at the forefront of technology, working on a variety of exciting projects. Your primary responsibilities will include designing, developing, and maintaining software applications that align with our clients' needs. You'll collaborate with a team of engineers to create robust solutions, troubleshoot software issues, and ensure the delivery of high-quality products. Key tasks will involve writing clean and efficient code, participating in code reviews, and integrating software solutions with other systems. You'll also engage in continuous learning to stay updated with emerging technologies and apply best practices in software engineering.",
    location: "San Francisco, CA",
    salary: 120000,
    company: "Tech Innovators Inc.",
    companyName: "Tech Innovators Inc.",
    companyDescription:
      "Tech Innovators Inc. is a leading technology company specializing in developing cutting-edge software solutions. We are committed to fostering innovation and driving technological advancements across various industries. Our team of dedicated professionals is passionate about creating high-quality products and providing exceptional services to our clients. With a collaborative work environment and a focus on professional growth, Tech Innovators Inc. is an ideal place for tech enthusiasts and innovators.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Data Scientist",
    description:
      "As a Data Scientist at Data Insights LLC, you will leverage your analytical skills to interpret complex data sets and generate actionable insights that drive business decisions. Your role will involve designing data models, implementing machine learning algorithms, and creating visualizations to present findings. You will work closely with stakeholders to understand their data needs, develop predictive models, and enhance business strategies. Your responsibilities will include data cleansing, feature engineering, and deploying models into production environments. Strong analytical skills, experience with data analysis tools, and a deep understanding of statistical methods are essential for success in this role.",
    location: "New York, NY",
    salary: 110000,
    company: "Data Insights LLC",
    companyName: "Data Insights LLC",
    companyDescription:
      "Data Insights LLC is a premier analytics firm specializing in transforming raw data into valuable insights. Our mission is to help businesses make informed decisions through advanced data analysis and machine learning techniques. With a team of expert data scientists and analysts, we offer a range of services, including data modeling, predictive analytics, and data visualization. At Data Insights LLC, we value innovation and are dedicated to delivering high-quality solutions to our clients.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Project Manager",
    description:
      "In the role of Project Manager at Management Pros, you will be responsible for overseeing project timelines, coordinating resources, and ensuring that project deliverables meet quality standards. You will work closely with clients to define project scope, develop detailed project plans, and manage project execution from initiation to completion. Your responsibilities will include leading project teams, facilitating communication between stakeholders, managing budgets, and addressing any issues that arise during the project lifecycle. Your goal is to ensure successful project outcomes by applying project management best practices and maintaining a focus on delivering value to clients.",
    location: "Chicago, IL",
    salary: 100000,
    company: "Management Pros",
    companyName: "Management Pros",
    companyDescription:
      "Management Pros is a distinguished project management consulting firm known for its expertise in delivering complex projects on time and within budget. We provide comprehensive project management services across various industries, focusing on optimizing processes, managing risks, and achieving project goals. Our team of experienced project managers is dedicated to ensuring client satisfaction and driving project success through effective planning and execution.",
    jobType: "Contract",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "UX Designer",
    description:
      "Join Design Masters as a UX Designer and be responsible for creating user-centered designs for both web and mobile applications. Your role will include conducting user research, developing wireframes and prototypes, and collaborating with developers to implement designs. You'll focus on designing intuitive and visually appealing user interfaces that enhance user experiences and drive engagement. Responsibilities include usability testing, gathering user feedback, and iterating on design solutions to meet user needs. Your work will significantly impact the usability and overall satisfaction of our products.",
    location: "Austin, TX",
    salary: 95000,
    company: "Design Masters",
    companyName: "Design Masters",
    companyDescription:
      "Design Masters is a leading design consultancy specializing in creating exceptional user experiences for digital products. Our team of skilled designers is dedicated to delivering innovative and user-friendly solutions that align with our clients' goals. We pride ourselves on our collaborative approach, ensuring that design projects are executed with creativity and attention to detail. At Design Masters, we strive to push the boundaries of design and provide outstanding results for our clients.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Marketing Specialist",
    description:
      "As a Marketing Specialist at Marketing Experts, you will be responsible for developing and executing marketing strategies to promote our brand and products. Your role involves conducting market research, creating and managing marketing campaigns, and analyzing campaign performance to ensure effectiveness. You will work closely with the marketing team to develop content, manage social media channels, and coordinate promotional events. Your goal is to enhance brand visibility and drive customer engagement through innovative marketing approaches and strategic planning.",
    location: "Los Angeles, CA",
    salary: 85000,
    company: "Marketing Experts",
    companyName: "Marketing Experts",
    companyDescription:
      "Marketing Experts is a dynamic marketing agency dedicated to helping businesses grow their brands and reach their target audiences. Our team of marketing professionals offers expertise in various areas, including digital marketing, content creation, and campaign management. We are committed to delivering creative solutions and measurable results for our clients, utilizing the latest marketing trends and technologies to drive success.",
    jobType: "Part-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Systems Administrator",
    description:
      "Tech Solutions is seeking a Systems Administrator to maintain and support our IT infrastructure. Your responsibilities will include configuring and managing servers, ensuring network security, and providing technical support to users. You'll handle system updates, monitor performance, and troubleshoot issues to ensure smooth IT operations. Your role will involve implementing best practices in system administration, managing backups, and maintaining documentation. Strong knowledge of server management, network protocols, and IT security is required.",
    location: "Seattle, WA",
    salary: 90000,
    company: "Tech Solutions",
    companyName: "Tech Solutions",
    companyDescription:
      "Tech Solutions is a reputable IT services company specializing in providing comprehensive technology solutions to businesses. We focus on delivering reliable IT infrastructure support, including server management, network security, and technical support services. Our team of skilled IT professionals is dedicated to ensuring optimal performance and security for our clients' technology environments.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Content Writer",
    description:
      "Content Creators is looking for a skilled Content Writer to create engaging and high-quality content for our digital platforms. Your role will involve writing articles, blog posts, and marketing materials that captivate and inform our audience. You'll collaborate with the marketing team to develop content strategies, ensure consistency with our brand voice, and optimize content for search engines. Your responsibilities will also include editing and proofreading content to ensure accuracy and adherence to style guidelines.",
    location: "Remote",
    salary: 70000,
    company: "Content Creators",
    companyName: "Content Creators",
    companyDescription:
      "Content Creators is a leading provider of content marketing solutions, offering a range of services to help businesses create compelling content that drives engagement and conversions. Our team of experienced writers and content strategists works closely with clients to develop content that aligns with their marketing goals. We are committed to delivering high-quality content that resonates with target audiences and supports overall business objectives.",
    jobType: "Freelance",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Sales Associate",
    description:
      "Retail Masters is seeking a Sales Associate to manage sales transactions and build strong relationships with customers. Your role involves assisting customers in finding products, answering their inquiries, and providing excellent customer service. You'll be responsible for managing inventory, processing sales transactions, and maintaining a clean and organized store environment. Strong interpersonal skills, a customer-focused approach, and previous sales experience are essential for success in this position.",
    location: "Miami, FL",
    salary: 60000,
    company: "Retail Masters",
    companyName: "Retail Masters",
    companyDescription:
      "Retail Masters is a prominent retail company known for its exceptional customer service and wide range of products. We are dedicated to providing a positive shopping experience for our customers through knowledgeable staff and a well-organized store environment. Our team is committed to delivering high-quality products and building lasting relationships with our customers.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Graphic Designer",
    description:
      "As a Graphic Designer at Creative Agency, you will create visual content for marketing and branding purposes. Your role includes designing graphics for various media, including print advertisements, digital campaigns, and social media posts. You'll work closely with the marketing team to develop design concepts, ensure brand consistency, and produce high-quality visual materials. Strong proficiency in design software, creativity, and attention to detail are required for this role.",
    location: "Denver, CO",
    salary: 75000,
    company: "Creative Agency",
    companyName: "Creative Agency",
    companyDescription:
      "Creative Agency is a top design and branding firm specializing in delivering innovative visual solutions. Our team of talented designers works on a diverse range of projects, from branding and marketing materials to digital content and interactive designs. We pride ourselves on our creativity and commitment to producing designs that make an impact and elevate our clients' brands.",
    jobType: "Contract",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Customer Support Specialist",
    description:
      "Support Services is hiring a Customer Support Specialist to assist customers with their inquiries and provide effective solutions. Your responsibilities will include handling customer calls, emails, and chat messages, managing customer accounts, and resolving issues promptly. You'll work to ensure a positive customer experience by troubleshooting problems, addressing concerns, and escalating complex issues to higher support levels when necessary. Excellent communication skills and experience in customer service are essential for this role.",
    location: "Phoenix, AZ",
    salary: 65000,
    company: "Support Services",
    companyName: "Support Services",
    companyDescription:
      "Support Services is a leading customer support company dedicated to delivering exceptional service to clients across various industries. We offer comprehensive support solutions, including call center operations, technical support, and customer service management. Our team is committed to providing responsive and efficient support to enhance customer satisfaction and loyalty.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
];

const seedJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert jobs into the database
    await Job.insertMany(jobs);

    console.log("Jobs successfully inserted");
  } catch (error) {
    console.error("Error inserting jobs:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedJobs();
