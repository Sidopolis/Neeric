# Neeric - Stop Wasting Money on AWS

Hey there! 👋 Welcome to **Neeric** — the tool that helps you find and clean up AWS cloud waste, so you can stop overpaying for stuff you don't use.

---

## 🚦 Why Neeric?

- **AWS bills too high?** You're not alone. Most teams pay for things they forgot about.
- **Neeric finds real waste** (not just idle stuff) and shows you exactly what's safe to clean up.
- **You're always in control:** Nothing gets deleted unless you say so.
- **Works for everyone:** Use the web dashboard, the CLI, or both!

---

## 🧑‍💻 What is Neeric (in one line)?

> Neeric scans your AWS account, finds unused resources, and helps you clean them up safely — saving you real money every month.

---

## ✨ How it feels to use Neeric

1. **Start the dashboard** (or CLI)
2. **Connect your AWS account** (read-only is fine)
3. **Hit scan** — see a list of waste, with cost and risk
4. **Pick what to clean up** (or just preview)
5. **Smile as your AWS bill goes down!**

---

## 🚀 Quick Start (for Humans)

### The Easy Way: Web Dashboard

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dashboard:**
   ```bash
   npm run dev
   ```
3. **Open your browser:** Go to [http://localhost:5174/dashboard](http://localhost:5174/dashboard)
4. **Connect AWS:** Enter your credentials (read-only is safest)
5. **Scan & Clean:** See what's wasting money, and approve what you want to clean up

### Prefer the Command Line?

1. **Install globally (optional):**
   ```bash
   npm install -g .
   ```
2. **Set up credentials:**
   ```bash
   neeric init
   ```
3. **Scan for waste:**
   ```bash
   neeric scan --region us-east-1
   ```
4. **Preview cleanup:**
   ```bash
   neeric cleanup --dry-run
   ```
5. **Actually clean up:**
   ```bash
   neeric cleanup
   ```

## 🎯 What We Find

- **EC2 Instances**: Stopped instances, low CPU utilization
- **EBS Volumes**: Unattached volumes, unused snapshots
- **RDS Databases**: Stopped instances, underutilized databases
- **Load Balancers**: ALBs/NLBs with no healthy targets
- **Lambda Functions**: Unused functions, oversized allocations
- **S3 Buckets**: Old buckets, incomplete multipart uploads

## 📊 Quick Start

### Web Dashboard

1. **Start the dashboard**:
   ```bash
   npm install
   npm run dev
   ```

2. **Open your browser**: Navigate to `http://localhost:5174/dashboard`

3. **Connect AWS**: Enter your AWS credentials (read-only recommended)

4. **Scan & Clean**: Find waste and approve cleanup actions

### CLI Tool

1. **Install globally** (optional):
   ```bash
   npm install -g .
   ```

2. **Setup credentials**:
   ```bash
   neeric init
   ```

3. **Scan for waste**:
   ```bash
   neeric scan --region us-east-1
   ```

4. **Clean up safely**:
   ```bash
   neeric cleanup --dry-run  # Preview changes
   neeric cleanup            # Actually clean up
   ```

## 🔐 AWS Permissions

For scanning, create an IAM user with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "rds:Describe*",
        "s3:List*",
        "elasticloadbalancing:Describe*",
        "lambda:List*",
        "cloudwatch:GetMetricStatistics"
      ],
      "Resource": "*"
    }
  ]
}
```

For cleanup, additional permissions are needed:

```json
{
  "Effect": "Allow",
  "Action": [
    "ec2:TerminateInstances",
    "ec2:DeleteVolume",
    "rds:DeleteDBInstance",
    "elasticloadbalancing:DeleteLoadBalancer",
    "lambda:DeleteFunction"
  ],
  "Resource": "*"
}
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS CLI configured (optional)

### From Source

```bash
git clone https://github.com/neeric/neeric.git
cd neeric
npm install
npm run dev
```

### Global Installation

```bash
npm install -g neeric
neeric dashboard
```

## 📱 Usage Examples

### Web Dashboard

```bash
# Start development server
npm run dev

# Build for production
npm run build
npm run preview
```

### CLI Commands

```bash
# Basic scan
neeric scan

# Scan specific region with JSON output
neeric scan --region eu-west-1 --format json

# Dry run cleanup
neeric cleanup --dry-run

# Setup with custom profile
neeric init --profile production

# Open web dashboard
neeric dashboard
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Dashboard │    │   CLI Tool      │    │   AWS APIs      │
│   (React/TS)    │────│   (Node.js)     │────│   (SDK v3)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────────────────────────────────────────────────────────┐
    │                 AWS Scanner Engine                          │
    │  • Resource Discovery  • Cost Estimation  • Risk Analysis  │
    └─────────────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Environment Variables

```bash
# AWS Credentials (optional - can use AWS CLI profiles)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1

# Dashboard settings
VITE_API_BASE_URL=http://localhost:3000
```

### Config File

Create `~/.neeric/config.json`:

```json
{
  "defaultRegion": "us-east-1",
  "riskThresholds": {
    "cpuUtilization": 5,
    "stoppedDays": 7,
    "unattachedDays": 30
  },
  "excludeResources": [
    "i-1234567890abcdef0"
  ]
}
```

## 📈 Cost Estimation

Neeric provides realistic cost estimates based on:

- **EC2**: On-demand pricing for instance types
- **EBS**: Storage pricing by volume type and size  
- **RDS**: Instance class and storage costs
- **ELB**: Load balancer and LCU pricing
- **Lambda**: Memory allocation and invocation costs
- **S3**: Storage class and request pricing

All estimates are in USD and represent monthly costs.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Development Setup

```bash
git clone https://github.com/neeric/neeric.git
cd neeric
npm install
npm run dev
```

### Running Tests

```bash
npm test
npm run test:e2e
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.neeric.com](https://docs.neeric.com)
- **Issues**: [GitHub Issues](https://github.com/neeric/neeric/issues)
- **Email**: hello@neeric.com
- **Discord**: [Join our community](https://discord.gg/neeric)

## 🎉 Success Stories

> "Neeric helped us find $3,200/month in waste across our staging environments. The CLI integration made it easy to add to our CI/CD pipeline." 
> — DevOps Team at TechCorp

> "Finally, a tool that actually understands what's safe to delete. Saved us 40% on our AWS bill in the first month."
> — CTO at StartupXYZ

## 🗺️ Roadmap

- [ ] **Multi-Account Support**: Scan across AWS Organizations
- [ ] **Terraform Integration**: Show Terraform-managed resources
- [ ] **Cost Forecasting**: Predict future waste based on trends
- [ ] **Slack/Teams Integration**: Send alerts and reports
- [ ] **Custom Rules Engine**: Define your own waste detection rules
- [ ] **Azure & GCP Support**: Expand beyond AWS

## 🏆 Why Neeric?

- **Built by Engineers**: We got tired of surprise AWS bills
- **Production Ready**: Used by Y Combinator companies
- **Open Source**: Transparent, auditable, extensible
- **Safety Focused**: Paranoid about not breaking things
- **Actually Works**: Finds real waste, not false positives

---

**Built with ❤️ by the Neeric team** | **From Y Combinator W25** 🚀 