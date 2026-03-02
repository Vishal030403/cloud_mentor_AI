export type MockQuestion = {
  id: string
  question: string
  options: string[]
  correctIndex?: number
  multipleCorrect?: number[]
  explanation: string
}

export type MockTest = {
  id: string
  title: string
  durationMinutes: number
  questions: MockQuestion[]
}

export const mockTests: MockTest[] = [
  {
    id: 'mock-1',
    title: 'AWS SAA Mock Test 1',
    durationMinutes: 130,
    questions: [
      {
        id: "q1",
        question: "AWS allows users to manage their resources using a web-based user interface. What is the name of this interface?",
        options: ["AWS CLI", "AWS API", "AWS SDK", "AWS Management Console"],
        correctIndex: 3,
        explanation: "The AWS Management Console is the browser-based interface used to manage AWS services visually."
      },
      {
        id: "q2",
        question: "Which of the following is an example of horizontal scaling in the AWS Cloud?",
        options: [
          "Replacing an existing EC2 instance with a larger one",
          "Increasing compute capacity of a single EC2 instance",
          "Adding more RAM to an EC2 instance",
          "Adding more EC2 instances of the same size"
        ],
        correctIndex: 3,
        explanation: "Horizontal scaling means increasing capacity by adding more instances instead of increasing instance size."
      },
      {
        id: "q3",
        question: "You have noticed that several critical Amazon EC2 instances have been terminated. Which AWS service would help determine who took this action?",
        options: ["Amazon Inspector", "AWS CloudTrail", "AWS Trusted Advisor", "EC2 Instance Usage Report"],
        correctIndex: 1,
        explanation: "CloudTrail logs all API calls and records who performed actions in your AWS account."
      },
      {
        id: "q4",
        question: "Which of the below options are related to the reliability of AWS? (Choose TWO)",
        options: [
          "Applying least privilege",
          "Automatically provisioning new resources",
          "All services are global",
          "Providing compensation",
          "Ability to recover quickly from failures"
        ],
        multipleCorrect: [1, 4],
        explanation: "Reliability focuses on automatic scaling and fast recovery from failures."
      },
      {
        id: "q5",
        question: "Which statement is true regarding the AWS Shared Responsibility Model?",
        options: [
          "Responsibilities vary depending on services used",
          "Security of IaaS is AWS responsibility",
          "Patching guest OS is AWS responsibility",
          "Security of managed services is customer responsibility"
        ],
        correctIndex: 0,
        explanation: "Responsibilities vary depending on the service model being used."
      },
      {
        id: "q6",
        question: "Consolidated billing with Reserved Instances — which is true?",
        options: [
          "Discounts shared only with master account",
          "All accounts receive hourly cost benefit",
          "Better performance than On-demand",
          "No cost benefit"
        ],
        correctIndex: 1,
        explanation: "Reserved Instance discounts are shared across linked accounts."
      },
      {
        id: "q7",
        question: "What ensures highest availability for an eCommerce app?",
        options: [
          "Multiple AZs and Edge locations",
          "Multiple AZs and subnets",
          "Multiple Regions and Availability Zones",
          "Multiple VPCs"
        ],
        correctIndex: 2,
        explanation: "Multi-Region plus Multi-AZ deployment provides maximum resilience."
      },
      {
        id: "q8",
        question: "What does AWS Snowball provide? (Choose TWO)",
        options: [
          "Local compute capability",
          "Software marketplace",
          "Hybrid storage",
          "Exabyte-scale transfer",
          "Secure large data transfer"
        ],
        multipleCorrect: [0, 4],
        explanation: "Snowball enables secure large-scale data transfer and local processing."
      },
      {
        id: "q9",
        question: "Enterprise support billing assistance — which service?",
        options: [
          "AWS Health Dashboard",
          "AWS Support Concierge",
          "AWS Customer Service",
          "AWS Operations Support"
        ],
        correctIndex: 1,
        explanation: "Support Concierge handles billing and account-related inquiries."
      },
      {
        id: "q10",
        question: "Reduce US latency for Tokyo-hosted app?",
        options: [
          "Amazon Connect routing",
          "New US domain",
          "Build US data center",
          "Deploy EC2 in US Region"
        ],
        correctIndex: 3,
        explanation: "Deploying infrastructure closer to users reduces latency."
      },
    
      // --- Remaining questions follow same structure ---
    
      {
        id: "q11",
        question: "Which AWS Service helps centrally manage billing and security policies across multiple accounts?",
        options: ["AWS Organizations", "AWS Trusted Advisor", "IAM User Groups", "AWS Config"],
        correctIndex: 0,
        explanation: "AWS Organizations enables centralized account management and policy enforcement."
      },
      {
        id: "q12",
        question: "Which service provides object-level storage in AWS?",
        options: ["Amazon EBS", "Amazon Instance Store", "Amazon EFS", "Amazon S3"],
        correctIndex: 3,
        explanation: "Amazon S3 is AWS object storage service."
      },
      {
        id: "q13",
        question: "Which feature automatically adjusts EC2 capacity based on demand?",
        options: ["Elastic Load Balancer", "AWS Budgets", "AWS Auto Scaling", "Cost Explorer"],
        correctIndex: 2,
        explanation: "Auto Scaling automatically increases or decreases EC2 instances."
      },
      {
        id: "q14",
        question: "Which S3 storage class is best for unpredictable access patterns?",
        options: [
          "S3 Intelligent-Tiering",
          "S3 Glacier Flexible Retrieval",
          "S3 Standard",
          "S3 Standard-IA"
        ],
        correctIndex: 0,
        explanation: "Intelligent-Tiering automatically moves objects between tiers."
      },
      {
        id: "q15",
        question: "Which AWS database supports key-value structured data?",
        options: ["Amazon DynamoDB", "Amazon Aurora", "Amazon Redshift", "Amazon RDS"],
        correctIndex: 0,
        explanation: "DynamoDB supports key-value and document data."
      },
      {
        id: "q16",
        question: "Which statement is NOT correct about EC2 On-Demand instances?",
        options: [
          "You must pay a startup fee",
          "Pay-as-you-go pricing",
          "No long-term commitment required",
          "Charged per second for Linux"
        ],
        correctIndex: 0,
        explanation: "On-Demand instances have no startup fee. You only pay for what you use."
      },
      {
        id: "q17",
        question: "Which services help ensure proper security settings? (Choose TWO)",
        options: [
          "AWS Trusted Advisor",
          "Amazon Inspector",
          "Amazon SNS",
          "Amazon CloudWatch",
          "Concierge Support"
        ],
        multipleCorrect: [0, 1],
        explanation: "Trusted Advisor provides best practice checks and Inspector scans for vulnerabilities."
      },
      {
        id: "q18",
        question: "What provides additional security beyond username/password?",
        options: [
          "Encrypted keys",
          "Email verification",
          "AWS KMS",
          "AWS MFA"
        ],
        correctIndex: 3,
        explanation: "Multi-Factor Authentication adds an additional security layer."
      },
      {
        id: "q19",
        question: "Which Enterprise Support feature provides scaling and architecture guidance?",
        options: [
          "AWS Knowledge Center",
          "AWS Health Dashboard",
          "Infrastructure Event Management",
          "AWS Support Concierge"
        ],
        correctIndex: 2,
        explanation: "Infrastructure Event Management provides architectural guidance for major events."
      },
      {
        id: "q20",
        question: "Which service reduces database maintenance overhead?",
        options: [
          "Amazon RDS",
          "Amazon Redshift",
          "Amazon DynamoDB",
          "Amazon CloudWatch"
        ],
        correctIndex: 0,
        explanation: "RDS automates backups, patching, and maintenance."
      },
      {
        id: "q21",
        question: "Best practice when designing AWS solutions?",
        options: [
          "Invest heavily early",
          "Use reservations for testing",
          "Automate wherever possible",
          "Overprovision compute"
        ],
        correctIndex: 2,
        explanation: "Automation improves scalability, flexibility, and experimentation."
      },
      {
        id: "q22",
        question: "Which statement is true regarding penetration testing of EC2?",
        options: [
          "Not allowed",
          "AWS performs automatically",
          "Customers can perform on their own instances",
          "Only on managed services"
        ],
        correctIndex: 2,
        explanation: "AWS allows customers to perform penetration testing on their own EC2 instances."
      },
      {
        id: "q23",
        question: "Which service ensures messages are not lost between components?",
        options: [
          "Amazon SQS",
          "Amazon SES",
          "AWS Direct Connect",
          "Amazon Connect"
        ],
        correctIndex: 0,
        explanation: "SQS provides durable message queuing."
      },
      {
        id: "q24",
        question: "Which helps design for failure? (Choose TWO)",
        options: [
          "Multi-factor authentication",
          "Availability Zones",
          "Elastic Load Balancing",
          "Penetration testing",
          "Vertical Scaling"
        ],
        multipleCorrect: [1, 2],
        explanation: "Multiple AZs and ELB improve availability and fault tolerance."
      },
      {
        id: "q25",
        question: "Which service provides a virtual network dedicated to your AWS account?",
        options: [
          "AWS VPN",
          "AWS Subnets",
          "AWS Dedicated Hosts",
          "Amazon VPC"
        ],
        correctIndex: 3,
        explanation: "Amazon VPC allows you to create isolated virtual networks."
      },
    
      {
        id: "q26",
        question: "Which service helps a customer view EC2 billing activity for the past month?",
        options: [
          "AWS Budgets",
          "AWS Pricing Calculator",
          "AWS Systems Manager",
          "AWS Cost & Usage Reports"
        ],
        correctIndex: 3,
        explanation: "Cost & Usage Reports provide detailed billing and usage data."
      },
      {
        id: "q27",
        question: "What do you gain from consolidated billing?",
        options: [
          "Costs reduced to half",
          "Organizational purpose only",
          "Volume discounts",
          "Five times free tier"
        ],
        correctIndex: 2,
        explanation: "Consolidated billing enables aggregated usage discounts."
      },
      {
        id: "q28",
        question: "How to keep EBS data safe? (Choose TWO)",
        options: [
          "Update firmware",
          "Create EBS snapshots",
          "Encrypt at rest",
          "Backup to external drive",
          "Prevent unauthorized data center access"
        ],
        multipleCorrect: [1, 2],
        explanation: "Snapshots provide backup and encryption protects data."
      },
      {
        id: "q29",
        question: "How does elasticity improve architecture?",
        options: [
          "Scale on-prem automatically",
          "Scale using ELB",
          "Reduce dependencies",
          "Automatically provision based on demand"
        ],
        correctIndex: 3,
        explanation: "Elasticity provisions resources automatically as demand changes."
      },
      {
        id: "q30",
        question: "Notify when AWS bill exceeds $2000? (Choose TWO)",
        options: [
          "CloudWatch billing alarm + SNS",
          "SES daily email",
          "AWS Budgets alert",
          "CloudTrail delete resources",
          "Amazon Connect alert"
        ],
        multipleCorrect: [0, 2],
        explanation: "CloudWatch billing alarms and AWS Budgets send alerts."
      },
    
      {
        id: "q31",
        question: "What does CloudFront use to deliver content globally?",
        options: [
          "Global Accelerator",
          "Regions",
          "Edge Locations",
          "Availability Zones"
        ],
        correctIndex: 2,
        explanation: "CloudFront uses Edge Locations for low-latency delivery."
      },
      {
        id: "q32",
        question: "Principle of Least Privilege refers to?",
        options: [
          "Grant only required permissions",
          "Grant core access",
          "Full access to trusted users",
          "No permissions"
        ],
        correctIndex: 0,
        explanation: "Users should only receive permissions they need."
      },
      {
        id: "q33",
        question: "Which is NOT a cloud computing model?",
        options: ["PaaS", "IaaS", "SaaS", "NaaS"],
        correctIndex: 3,
        explanation: "AWS models include IaaS, PaaS, SaaS — not NaaS."
      },
      {
        id: "q34",
        question: "Most cost-effective storage for rarely accessed recordings?",
        options: [
          "S3 Intelligent-Tiering",
          "AWS Marketplace",
          "S3 Glacier Deep Archive",
          "Amazon EBS"
        ],
        correctIndex: 2,
        explanation: "Glacier Deep Archive is cheapest for long-term archival."
      },
      {
        id: "q35",
        question: "Which service provides DNS in AWS?",
        options: ["Route 53", "AWS Config", "CloudFront", "EMR"],
        correctIndex: 0,
        explanation: "Route 53 is AWS managed DNS service."
      },
    
      {
        id: "q36",
        question: "Protect against DDoS attacks? (Choose TWO)",
        options: [
          "AWS Shield",
          "AWS Config",
          "Amazon Cognito",
          "AWS WAF",
          "AWS KMS"
        ],
        multipleCorrect: [0, 3],
        explanation: "Shield protects from DDoS; WAF filters malicious traffic."
      },
      {
        id: "q37",
        question: "Where to store frequently accessed data for optimal response?",
        options: [
          "OpsWorks",
          "Storage Gateway",
          "EBS",
          "ElastiCache"
        ],
        correctIndex: 3,
        explanation: "ElastiCache provides in-memory caching."
      },
      {
        id: "q38",
        question: "One-day EC2 usage — best option?",
        options: [
          "Reserved",
          "Spot",
          "Dedicated",
          "On-Demand"
        ],
        correctIndex: 3,
        explanation: "On-Demand is best for short-term workloads."
      },
      {
        id: "q39",
        question: "Thumbnail processing — most cost-effective?",
        options: [
          "Reserved",
          "On-Demand",
          "Dedicated",
          "Spot"
        ],
        correctIndex: 3,
        explanation: "Spot Instances are cheapest for interruptible workloads."
      },
      {
        id: "q40",
        question: "Global CDN service?",
        options: [
          "VPN",
          "Direct Connect",
          "Regions",
          "CloudFront"
        ],
        correctIndex: 3,
        explanation: "CloudFront is AWS global CDN."
      },
    
      {
        id: "q41",
        question: "Manage agreements with AWS?",
        options: [
          "AWS Artifact",
          "Certificate Manager",
          "Systems Manager",
          "Organizations"
        ],
        correctIndex: 0,
        explanation: "AWS Artifact provides compliance and agreement management."
      },
      {
        id: "q42",
        question: "AWS Managed Services? (Choose TWO)",
        options: [
          "VPC",
          "DynamoDB",
          "EMR",
          "IAM",
          "EC2"
        ],
        multipleCorrect: [1, 2],
        explanation: "DynamoDB and EMR are fully managed services."
      },
      {
        id: "q43",
        question: "NoSQL database offering?",
        options: [
          "Aurora",
          "DynamoDB",
          "EBS",
          "Redshift"
        ],
        correctIndex: 1,
        explanation: "DynamoDB is AWS NoSQL database."
      },
      {
        id: "q44",
        question: "Primary Enterprise support contact?",
        options: [
          "IAM user",
          "IEM engineer",
          "Consulting Partner",
          "TAM"
        ],
        correctIndex: 3,
        explanation: "Enterprise support includes a dedicated TAM."
      },
      {
        id: "q45",
        question: "View AWS spending distribution?",
        options: [
          "VPC Console",
          "Support",
          "Cost Explorer",
          "Finance Team"
        ],
        correctIndex: 2,
        explanation: "Cost Explorer visualizes spending trends."
      },
    
      {
        id: "q46",
        question: "Required for AWS CLI access?",
        options: [
          "Access keys",
          "Secret token",
          "UserID",
          "Username/password"
        ],
        correctIndex: 0,
        explanation: "CLI requires access key and secret access key."
      },
      {
        id: "q47",
        question: "Malicious AWS resource activity — contact?",
        options: [
          "Customer Service",
          "AWS Abuse Team",
          "Concierge",
          "Security Team"
        ],
        correctIndex: 1,
        explanation: "The AWS Abuse team handles malicious usage."
      },
      {
        id: "q48",
        question: "Examples of AWS shared controls? (Choose TWO)",
        options: [
          "Patch Management",
          "IAM Management",
          "VPC Management",
          "Configuration Management",
          "Data Center operations"
        ],
        multipleCorrect: [0, 3],
        explanation: "Patch and configuration management are shared controls."
      },
      {
        id: "q49",
        question: "Services helping detect/react to failure? (Choose TWO)",
        options: [
          "ELB",
          "Auto Scaling",
          "Athena",
          "ECR",
          "EC2"
        ],
        multipleCorrect: [0, 1],
        explanation: "ELB distributes traffic; Auto Scaling replaces failed instances."
      },
      {
        id: "q50",
        question: "Service for high global streaming speeds?",
        options: [
          "SNS",
          "Kinesis Video Streams",
          "CloudFormation",
          "CloudFront"
        ],
        correctIndex: 3,
        explanation: "CloudFront delivers content globally with low latency."
      },
    
      {
        id: "q51",
        question: "Database with automated backups?",
        options: [
          "MySQL on EC2",
          "Aurora",
          "DynamoDB",
          "Neptune"
        ],
        correctIndex: 1,
        explanation: "Aurora provides automated backups."
      },
      {
        id: "q52",
        question: "Infrastructure as Code service?",
        options: [
          "CloudFormation",
          "Config",
          "SES",
          "EMR"
        ],
        correctIndex: 0,
        explanation: "CloudFormation provisions infrastructure via templates."
      },
      {
        id: "q53",
        question: "Responsibility of AWS under Shared Model?",
        options: [
          "Client-side encryption",
          "Configuring infrastructure devices",
          "Server-side encryption",
          "Security Groups"
        ],
        correctIndex: 1,
        explanation: "AWS manages the infrastructure layer."
      },
      {
        id: "q54",
        question: "AWS Health Dashboard provides? (Choose TWO)",
        options: [
          "Troubleshooting guidance",
          "Health checks for ASG",
          "Cost optimization",
          "Vulnerability dashboard",
          "Personalized service health view"
        ],
        multipleCorrect: [0, 4],
        explanation: "Health Dashboard gives personalized service health and guidance."
      },
      {
        id: "q55",
        question: "Monitor EC2 performance?",
        options: [
          "Lambda",
          "Config",
          "CloudWatch",
          "CloudTrail"
        ],
        correctIndex: 2,
        explanation: "CloudWatch monitors metrics and logs."
      },
    
      {
        id: "q56",
        question: "Infrastructure security optimization recommendations?",
        options: [
          "Shield",
          "Console",
          "Secrets Manager",
          "Trusted Advisor"
        ],
        correctIndex: 3,
        explanation: "Trusted Advisor provides security best practice checks."
      },
      {
        id: "q57",
        question: "NOT a benefit of Amazon S3? (Choose TWO)",
        options: [
          "Unlimited storage",
          "Runs applications",
          "Object size limits",
          "Manual scaling",
          "11 9's durability"
        ],
        multipleCorrect: [1, 3],
        explanation: "S3 cannot run applications and scales automatically."
      },
      {
        id: "q58",
        question: "Customer responsibilities? (Choose TWO)",
        options: [
          "Disk disposal",
          "Physical access control",
          "Network patching",
          "Password complexity rules",
          "Configuring network access rules"
        ],
        multipleCorrect: [3, 4],
        explanation: "Customers manage IAM and network configurations."
      },
      {
        id: "q59",
        question: "Deploy IBM MQ quickly?",
        options: [
          "Aurora",
          "CloudWatch",
          "AWS Quick Start",
          "OpsWorks"
        ],
        correctIndex: 2,
        explanation: "Quick Start provides pre-built reference deployments."
      },
      {
        id: "q60",
        question: "RI type allowing exchange for higher capacity?",
        options: [
          "Elastic RI",
          "Premium RI",
          "Standard RI",
          "Convertible RI"
        ],
        correctIndex: 3,
        explanation: "Convertible RIs allow exchange for different instance types."
      },
      {
        id: "q61",
        question: "A company runs a critical production application on EC2 instances behind an Application Load Balancer in a single Region. The company requires recovery within 15 minutes if an entire Region becomes unavailable. Which solution meets this requirement MOST cost-effectively?",
        options: [
          "Deploy Multi-AZ architecture in the same Region",
          "Deploy identical infrastructure in a second Region with Route 53 failover routing",
          "Use Auto Scaling within the same Region",
          "Increase EC2 instance sizes to handle failure"
        ],
        correctIndex: 1,
        explanation: "Multi-Region deployment with Route 53 failover enables regional disaster recovery within minutes."
      },
      {
        id: "q62",
        question: "A company stores sensitive data in Amazon S3 and wants to ensure that data is encrypted using keys that the company fully controls and rotates. Which solution meets this requirement?",
        options: [
          "Use SSE-S3 encryption",
          "Use SSE-KMS with AWS-managed keys",
          "Use SSE-KMS with customer-managed CMK",
          "Use client-side encryption without AWS services"
        ],
        correctIndex: 2,
        explanation: "Customer-managed KMS keys provide full control over key rotation and access policies."
      },
      {
        id: "q63",
        question: "A media company processes thousands of uploaded images daily. The processing workload is fault-tolerant and can tolerate interruptions. The company wants to minimize costs. Which architecture is MOST cost-effective?",
        options: [
          "On-Demand EC2 instances in Auto Scaling",
          "Reserved Instances",
          "Spot Instances with Auto Scaling",
          "Dedicated Hosts"
        ],
        correctIndex: 2,
        explanation: "Spot Instances are ideal for fault-tolerant workloads and provide significant cost savings."
      },
      {
        id: "q64",
        question: "A company wants to improve the performance of its global web application while minimizing changes to the existing architecture. Users are located worldwide. Which solution should the company implement?",
        options: [
          "Deploy EC2 instances in all Regions",
          "Use Amazon CloudFront with the existing Application Load Balancer",
          "Use AWS Direct Connect",
          "Increase EC2 instance sizes"
        ],
        correctIndex: 1,
        explanation: "CloudFront caches content at Edge Locations, reducing latency globally without major architectural changes."
      },
      {
        id: "q65",
        question: "A company is designing a multi-tier application and wants to ensure that a failure in one component does not cascade and affect other components. Which architectural principle should they follow?",
        options: [
          "Tightly coupled architecture",
          "Vertical scaling",
          "Decoupled architecture using Amazon SQS",
          "Single Availability Zone deployment"
        ],
        correctIndex: 2,
        explanation: "Decoupling components using SQS prevents cascading failures and improves resilience."
      }
    ]
  },

  {
    id: 'mock-2',
    title: 'AWS SAA Mock Test 2',
    durationMinutes: 130,
    questions: [
      {
        id: "q1",
        question: "According to the AWS Shared Responsibility Model, which of the following are the responsibility of the customer? (Choose TWO)",
        options: [
          "Managing environmental events of AWS data centers",
          "Protecting the confidentiality of data in transit in Amazon S3",
          "Controlling physical access to AWS Regions",
          "Ensuring that the underlying EC2 host is configured properly",
          "Patching applications installed on Amazon EC2"
        ],
        multipleCorrect: [1, 4],
        explanation: "Customers are responsible for protecting their data and patching applications running on EC2."
      },
      {
        id: "q2",
        question: "Which AWS services can be used as compute resources? (Choose TWO)",
        options: [
          "Amazon VPC",
          "Amazon CloudWatch",
          "Amazon S3",
          "Amazon EC2",
          "AWS Lambda"
        ],
        multipleCorrect: [3, 4],
        explanation: "EC2 and Lambda are compute services."
      },
      {
        id: "q3",
        question: "Your company is designing a new application to store and retrieve photos and videos. Which service should you recommend?",
        options: [
          "Amazon EBS",
          "Amazon SQS",
          "Amazon S3",
          "Amazon Instance Store"
        ],
        correctIndex: 2,
        explanation: "Amazon S3 is object storage optimized for media files."
      },
      {
        id: "q4",
        question: "Which is equivalent to a username and password for programmatic access?",
        options: [
          "Instance Password",
          "Key pairs",
          "Access Keys",
          "MFA"
        ],
        correctIndex: 2,
        explanation: "Access Keys authenticate API and CLI access."
      },
      {
        id: "q5",
        question: "What does Amazon ElastiCache provide?",
        options: [
          "In-memory caching for read-heavy applications",
          "Ehcache compatible store",
          "Software marketplace",
          "Cloud DNS"
        ],
        correctIndex: 0,
        explanation: "ElastiCache provides Redis or Memcached caching."
      },
    
      {
        id: "q6",
        question: "What service enables managing multiple AWS accounts from a master account?",
        options: [
          "AWS WAF",
          "AWS Trusted Advisor",
          "AWS Organizations",
          "Amazon Config"
        ],
        correctIndex: 2,
        explanation: "AWS Organizations centralizes account management."
      },
      {
        id: "q7",
        question: "Which EC2 purchasing option supports BYOL for most scenarios?",
        options: [
          "Dedicated Instances",
          "Dedicated Hosts",
          "On-Demand",
          "Reserved"
        ],
        correctIndex: 1,
        explanation: "Dedicated Hosts allow BYOL by providing control over physical servers."
      },
      {
        id: "q8",
        question: "One benefit of moving from on-prem to AWS?",
        options: [
          "Free enterprise support",
          "Automatic data protection",
          "Reduced CapEx",
          "AWS manages customer apps"
        ],
        correctIndex: 2,
        explanation: "AWS converts CapEx into OpEx."
      },
      {
        id: "q9",
        question: "Important AWS design principles? (Choose TWO)",
        options: [
          "Always use global services",
          "Always pay-as-you-go",
          "Treat servers as fixed",
          "Automate wherever possible",
          "Remove single points of failure"
        ],
        multipleCorrect: [3, 4],
        explanation: "Automation and eliminating SPOFs are key design principles."
      },
      {
        id: "q10",
        question: "Which service establishes private dedicated connectivity to AWS?",
        options: [
          "AWS Direct Connect",
          "CloudFront",
          "Snowball",
          "Route 53"
        ],
        correctIndex: 0,
        explanation: "Direct Connect provides private connectivity."
      },
    
      {
        id: "q11",
        question: "Which service isolates network configurations?",
        options: [
          "Internet Gateway",
          "VPC",
          "Security Groups",
          "CloudFront"
        ],
        correctIndex: 1,
        explanation: "VPC creates isolated networks."
      },
      {
        id: "q12",
        question: "Protect web apps from SQL injection?",
        options: [
          "Cognito",
          "IAM",
          "Aurora",
          "AWS WAF"
        ],
        correctIndex: 3,
        explanation: "AWS WAF filters malicious web traffic."
      },
      {
        id: "q13",
        question: "Analyze and process large datasets?",
        options: [
          "Amazon EMR",
          "Amazon MQ",
          "SNS",
          "SQS"
        ],
        correctIndex: 0,
        explanation: "EMR processes big data workloads."
      },
      {
        id: "q14",
        question: "Sole AWS responsibilities? (Choose TWO)",
        options: [
          "Monitoring network performance",
          "Installing software on EC2",
          "Creating hypervisors",
          "Configuring ACLs",
          "Hardware maintenance"
        ],
        multipleCorrect: [2, 4],
        explanation: "AWS manages hypervisor and hardware."
      },
      {
        id: "q15",
        question: "Highest control over virtual infrastructure?",
        options: [
          "Redshift",
          "DynamoDB",
          "EC2",
          "RDS"
        ],
        correctIndex: 2,
        explanation: "EC2 provides OS-level control."
      },
    
      // CONTINUING IN SAME STRUCTURE...
    
      {
        id: "q16",
        question: "Default console credentials for IAM user?",
        options: ["MFA", "Security tokens", "Username and password", "Access keys"],
        correctIndex: 2,
        explanation: "IAM users use username and password for console access."
      },
      {
        id: "q17",
        question: "Create multiple servers from template in AWS?",
        options: ["IAM", "Internet Gateway", "EBS Snapshot", "AMI"],
        correctIndex: 3,
        explanation: "AMIs allow launching multiple identical instances."
      },
      {
        id: "q18",
        question: "Two cloud advantages? (Choose TWO)",
        options: [
          "Reserved capacity",
          "Eliminate SPOFs",
          "Distributed infrastructure",
          "Virtualized compute",
          "Dedicated hosting"
        ],
        multipleCorrect: [2, 3],
        explanation: "Cloud provides distributed and virtualized infrastructure."
      },
      {
        id: "q19",
        question: "Security managed by AWS? (Choose TWO)",
        options: [
          "Encryption of EBS",
          "VPC security",
          "Access permissions",
          "Hardware patching",
          "Physical infrastructure"
        ],
        multipleCorrect: [3, 4],
        explanation: "AWS manages physical infrastructure and hardware patching."
      },
      {
        id: "q20",
        question: "Operational Excellence pillar focuses on?",
        options: [
          "Recover from failure",
          "Efficient resource use",
          "Monitor systems and improve processes",
          "Manage datacenter"
        ],
        correctIndex: 2,
        explanation: "Operational Excellence emphasizes monitoring and continuous improvement."
      }
    ,
      {
        id: "q21",
        question: "Which of the following is NOT a benefit of using Edge Locations?",
        options: [
          "Cache recent responses",
          "Improve upload experience",
          "Distribute traffic across instances",
          "Low-latency global content delivery"
        ],
        correctIndex: 2,
        explanation: "Traffic distribution across instances is handled by Load Balancers, not Edge Locations."
      },
      {
        id: "q22",
        question: "Change management tools to audit resource changes? (Choose TWO)",
        options: [
          "AWS CloudTrail",
          "Amazon Comprehend",
          "AWS Transit Gateway",
          "AWS X-Ray",
          "AWS Config"
        ],
        multipleCorrect: [0, 4],
        explanation: "CloudTrail logs API calls and AWS Config tracks configuration changes."
      },
      {
        id: "q23",
        question: "Run containerized applications on EC2 cluster?",
        options: [
          "Amazon ECS",
          "AWS Data Pipeline",
          "AWS Cloud9",
          "AWS Personal Health Dashboard"
        ],
        correctIndex: 0,
        explanation: "Amazon ECS runs containerized workloads on EC2 or Fargate."
      },
      {
        id: "q24",
        question: "Service that helps ensure compliance?",
        options: [
          "CloudFront",
          "CloudEndure",
          "CloudWatch",
          "CloudTrail"
        ],
        correctIndex: 3,
        explanation: "CloudTrail provides governance, compliance, and auditing of API activity."
      },
      {
        id: "q25",
        question: "Reduce S3 costs?",
        options: [
          "Import/Export to Glacier",
          "Use correct storage classes",
          "Choose right AZ",
          "Move all data to EBS"
        ],
        correctIndex: 1,
        explanation: "Choosing appropriate storage classes reduces storage costs."
      },
    
      {
        id: "q26",
        question: "Maintain high availability? (Choose TWO)",
        options: [
          "Direct Connect",
          "EC2 Auto Scaling",
          "Elastic Load Balancer",
          "CloudFormation",
          "Network ACLs"
        ],
        multipleCorrect: [1, 2],
        explanation: "Auto Scaling replaces failed instances and ELB distributes traffic."
      },
      {
        id: "q27",
        question: "Reduce monthly AWS costs?",
        options: [
          "Enable Auto Scaling",
          "Use NLB for HTTP",
          "Remove cost tags",
          "Multi-AZ deployment"
        ],
        correctIndex: 0,
        explanation: "Auto Scaling scales in during low demand to reduce costs."
      },
      {
        id: "q28",
        question: "Faster uploads to S3 using CloudFront edge network?",
        options: [
          "S3 Transfer Acceleration",
          "AWS WAF",
          "Snowmobile",
          "Snowball"
        ],
        correctIndex: 0,
        explanation: "S3 Transfer Acceleration uses CloudFront edge network for faster uploads."
      },
      {
        id: "q29",
        question: "Filters incoming EC2 traffic?",
        options: [
          "AWS X-Ray",
          "Network ACL",
          "Security Groups",
          "VPC Flow Logs"
        ],
        correctIndex: 2,
        explanation: "Security Groups act as virtual firewalls for EC2 instances."
      },
      {
        id: "q30",
        question: "Improve global performance? (Choose TWO)",
        options: [
          "AWS KMS",
          "AWS Global Accelerator",
          "Direct Connect",
          "AWS Glue",
          "CloudFront"
        ],
        multipleCorrect: [1, 4],
        explanation: "Global Accelerator and CloudFront improve global performance."
      },
    
      {
        id: "q31",
        question: "Customer responsibilities in RDS? (Choose TWO)",
        options: [
          "Build database schema",
          "Perform backups",
          "Manage DB settings",
          "Patch DB software",
          "Install DB software"
        ],
        multipleCorrect: [0, 2],
        explanation: "Customers manage schema and configuration settings."
      },
      {
        id: "q32",
        question: "Structured data migration to AWS?",
        options: [
          "DynamoDB",
          "SNS",
          "RDS",
          "ElastiCache"
        ],
        correctIndex: 2,
        explanation: "RDS supports structured relational databases."
      },
      {
        id: "q33",
        question: "AWS program supporting architecture improvement company?",
        options: [
          "APN Consulting Partners",
          "AWS TAM",
          "APN Technology Partners",
          "Professional Services"
        ],
        correctIndex: 0,
        explanation: "APN Consulting Partners assist in architecture design."
      },
      {
        id: "q34",
        question: "AWS serverless compute?",
        options: [
          "Lightsail",
          "Lambda",
          "RDS",
          "EC2"
        ],
        correctIndex: 1,
        explanation: "AWS Lambda is fully serverless compute."
      },
      {
        id: "q35",
        question: "EC2 crash but users unaffected. What was done correctly?",
        options: [
          "Elastic system",
          "Fault tolerant system",
          "Encrypted system",
          "Scalable system"
        ],
        correctIndex: 1,
        explanation: "Fault tolerance ensures system continues operating during failures."
      },
    
      {
        id: "q36",
        question: "Where can you store files? (Choose TWO)",
        options: [
          "EFS",
          "SNS",
          "EBS",
          "ECS",
          "EMR"
        ],
        multipleCorrect: [0, 2],
        explanation: "EFS and EBS are storage services."
      },
      {
        id: "q37",
        question: "Reliable message delivery?",
        options: [
          "SQS",
          "Storage Gateway",
          "SES",
          "S3"
        ],
        correctIndex: 0,
        explanation: "Amazon SQS ensures reliable message delivery."
      },
      {
        id: "q38",
        question: "EC2 1–3 year commitment pricing?",
        options: [
          "Pay less as AWS grows",
          "Pay as you go",
          "Pay less by using more",
          "Save when you reserve"
        ],
        correctIndex: 3,
        explanation: "Reserved Instances provide discounts for long-term commitment."
      },
      {
        id: "q39",
        question: "Reduce RDS costs?",
        options: [
          "Right-size before/after migration",
          "Multi-region passive",
          "Combine reservations",
          "Active-active"
        ],
        correctIndex: 0,
        explanation: "Right-sizing avoids overprovisioning."
      },
      {
        id: "q40",
        question: "Primary RDS storage?",
        options: [
          "Glacier",
          "EBS",
          "EFS",
          "S3"
        ],
        correctIndex: 1,
        explanation: "RDS uses EBS volumes."
      },
    
      {
        id: "q41",
        question: "Troubleshoot microservices latency?",
        options: [
          "CodePipeline",
          "X-Ray",
          "Inspector",
          "CloudTrail"
        ],
        correctIndex: 1,
        explanation: "X-Ray traces distributed applications."
      },
      {
        id: "q42",
        question: "Native Multi-AZ fault tolerance? (Choose TWO)",
        options: [
          "Redshift",
          "Snowball",
          "S3",
          "EBS",
          "DynamoDB"
        ],
        multipleCorrect: [2, 4],
        explanation: "S3 and DynamoDB are multi-AZ by design."
      },
      {
        id: "q43",
        question: "Improve RDS availability? (Choose TWO)",
        options: [
          "Regions",
          "Multi-AZ",
          "Automatic patching",
          "Read Replicas",
          "Edge Locations"
        ],
        multipleCorrect: [1, 3],
        explanation: "Multi-AZ and Read Replicas improve availability."
      },
      {
        id: "q44",
        question: "Reduce latency for Asian users?",
        options: [
          "Replicate across AZs",
          "Migrate provider",
          "Recreate website",
          "Use CloudFront CDN"
        ],
        correctIndex: 3,
        explanation: "CloudFront reduces latency via edge caching."
      },
      {
        id: "q45",
        question: "Control how developers interact with AWS services?",
        options: [
          "IAM",
          "RDS",
          "NACL",
          "EMR"
        ],
        correctIndex: 0,
        explanation: "IAM manages identities and permissions."
      },
    
      {
        id: "q46",
        question: "EC2 falls under which cloud model?",
        options: [
          "IaaS & SaaS",
          "IaaS",
          "SaaS",
          "PaaS"
        ],
        correctIndex: 1,
        explanation: "EC2 is Infrastructure as a Service."
      },
      {
        id: "q47",
        question: "Best practice when building AWS applications?",
        options: [
          "Strengthen physical security",
          "Trusted hardware vendors",
          "IAM for performance",
          "Decouple components"
        ],
        correctIndex: 3,
        explanation: "Decoupling improves scalability and resilience."
      },
      {
        id: "q48",
        question: "Store photos/videos?",
        options: [
          "EBS",
          "SQS",
          "Instance Store",
          "S3"
        ],
        correctIndex: 3,
        explanation: "S3 is optimized for object storage."
      },
      {
        id: "q49",
        question: "Glacier suitable for? (Choose TWO)",
        options: [
          "Active archives",
          "Dynamic website assets",
          "Long-term analytic data",
          "Active databases",
          "Cached data"
        ],
        multipleCorrect: [0, 2],
        explanation: "Glacier is for long-term archival storage."
      },
      {
        id: "q50",
        question: "What does Elastic Beanstalk provide?",
        options: [
          "PaaS deployment automation",
          "ECS compute engine",
          "Scalable file storage",
          "NoSQL DB"
        ],
        correctIndex: 0,
        explanation: "Elastic Beanstalk automates application deployment."
      },
    
      {
        id: "q51",
        question: "Automated network vulnerability assessments?",
        options: [
          "Kinesis",
          "Security Groups",
          "Amazon Inspector",
          "NACL"
        ],
        correctIndex: 2,
        explanation: "Inspector scans for vulnerabilities."
      },
      {
        id: "q52",
        question: "Controls customers fully inherit? (Choose TWO)",
        options: [
          "Patch management",
          "Database controls",
          "Awareness & Training",
          "Environmental controls",
          "Physical controls"
        ],
        multipleCorrect: [3, 4],
        explanation: "Environmental and physical controls are AWS-managed."
      },
      {
        id: "q53",
        question: "Most cost-effective 3-year RDS hosting?",
        options: [
          "Reserved – No Upfront",
          "Reserved – Partial Upfront",
          "On-Demand",
          "Spot"
        ],
        correctIndex: 1,
        explanation: "Partial upfront offers better long-term savings."
      },
      {
        id: "q54",
        question: "Improve global user experience?",
        options: [
          "Elasticity",
          "Global reach",
          "Durability",
          "High availability"
        ],
        correctIndex: 1,
        explanation: "Global infrastructure improves user experience."
      },
      {
        id: "q55",
        question: "Savings Plans apply to? (Choose TWO)",
        options: [
          "AWS Batch",
          "Outposts",
          "Lightsail",
          "EC2",
          "Lambda"
        ],
        multipleCorrect: [3, 4],
        explanation: "Savings Plans apply to EC2 and Lambda."
      },
    
      {
        id: "q56",
        question: "Protect workloads from regional disasters?",
        options: [
          "Edge replication",
          "Multi-AZ",
          "Subnet backup",
          "Multi-Region Active-Active"
        ],
        correctIndex: 3,
        explanation: "Multi-Region deployment protects against regional failures."
      },
      {
        id: "q57",
        question: "Correct statements about service limits? (Choose TWO)",
        options: [
          "Contact AWS Support to increase limits",
          "Each IAM user same limit",
          "No service limits",
          "Trusted Advisor monitors limits",
          "SES sends limit notifications"
        ],
        multipleCorrect: [0, 3],
        explanation: "Support can increase limits; Trusted Advisor monitors usage."
      },
      {
        id: "q58",
        question: "Script-based AWS management tool?",
        options: [
          "Console",
          "Service Catalog",
          "OpsWorks",
          "AWS CLI"
        ],
        correctIndex: 3,
        explanation: "AWS CLI allows script-based management."
      },
      {
        id: "q59",
        question: "Hybrid connectivity options? (Choose TWO)",
        options: [
          "Artifact",
          "Cloud9",
          "Direct Connect",
          "CloudTrail",
          "VPN"
        ],
        multipleCorrect: [2, 4],
        explanation: "Direct Connect and VPN provide hybrid connectivity."
      },
      {
        id: "q60",
        question: "Distribute HTTP traffic across EC2 instances?",
        options: [
          "EC2 Auto Recovery",
          "Auto Scaling",
          "NLB",
          "Application Load Balancer"
        ],
        correctIndex: 3,
        explanation: "ALB distributes HTTP/HTTPS traffic."
      },
    
      {
        id: "q61",
        question: "MySQL-compatible scalable relational DB?",
        options: [
          "Neptune",
          "Aurora",
          "RDS SQL Server",
          "RDS PostgreSQL"
        ],
        correctIndex: 1,
        explanation: "Aurora is MySQL-compatible and scalable."
      },
      {
        id: "q62",
        question: "Protect EC2 from DDoS? (Choose TWO)",
        options: [
          "CloudHSM",
          "Security Groups",
          "AWS Batch",
          "IAM",
          "Network ACLs"
        ],
        multipleCorrect: [1, 4],
        explanation: "Security Groups and NACLs filter traffic."
      },
      {
        id: "q63",
        question: "AWS data warehouse service?",
        options: [
          "Redshift",
          "Kinesis",
          "DynamoDB",
          "RDS"
        ],
        correctIndex: 0,
        explanation: "Redshift is AWS data warehouse."
      },
      {
        id: "q64",
        question: "Consideration in TCO analysis?",
        options: [
          "Application development",
          "Market research",
          "Business analysis",
          "Physical hardware"
        ],
        correctIndex: 3,
        explanation: "TCO compares hardware and infrastructure costs."
      },
      {
        id: "q65",
        question: "How are Linux EC2 instances billed?",
        options: [
          "Per second (min 1 min)",
          "Per hour (min 1 day)",
          "Per minute (min 1 hour)",
          "Per day (min 1 month)"
        ],
        correctIndex: 0,
        explanation: "Linux EC2 instances are billed per second with 60-second minimum."
      },
    ]
  },

  {
    id: 'mock-3',
    title: 'AWS SAA Mock Test 3',
    durationMinutes: 130,
    questions: [],
  },
  {
    id: 'mock-4',
    title: 'AWS SAA Mock Test 4',
    durationMinutes: 130,
    questions: [],
  },
  {
    id: 'mock-5',
    title: 'AWS SAA Mock Test 5',
    durationMinutes: 130,
    questions: [],
  },

    ]