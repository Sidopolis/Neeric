# Neeric Quick Start Guide 🚀

Hey! 👋 Ready to save money on AWS? Here's how to get Neeric running in just a few minutes.

---

## What is this?

**Neeric** is your friendly AWS cleaning sidekick. It finds stuff you're paying for but not using, and helps you clean it up safely.

---

## Why use Neeric?
- Your AWS bill is probably too high (don't worry, everyone's is)
- Neeric shows you real, safe-to-delete waste
- You're always in control — nothing gets deleted unless you say so
#### Windows:
```bash
# Double-click: start.bat
# OR run in terminal:
npm run dev
```

#### Mac/Linux:
```bash
./start.sh
# OR:
npm run dev
```

Then visit: **http://localhost:5174/dashboard**

### 2. **Command Line Tool**
Perfect for automation, scripting, and DevOps workflows.

```bash
# Quick scan
npm run cli scan

# Setup AWS credentials
npm run cli init

# Preview cleanup (safe)
npm run cli cleanup --dry-run

# Actually clean up
npm run cli cleanup

# Check if dashboard is running
npm run cli status
```

### 3. **Docker** (Production)
```bash
# Build and run
docker build -t neeric .
docker run -p 3000:3000 neeric

# Or use docker-compose
docker-compose up
```

## 🔐 AWS Setup (Required)

### Step 1: Create IAM User
Create a new IAM user in AWS Console with these permissions:

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

### Step 2: Get Credentials
1. Go to IAM → Users → [Your User] → Security Credentials
2. Create Access Key
3. Copy the Access Key ID and Secret Access Key

### Step 3: Enter in Neeric
- **Web Dashboard**: Enter in the connection form
- **CLI**: Run `npm run cli init`

## 💰 What Neeric Finds

### Real Examples:
```
Service  Resource     Name              Cost/mo  Risk    Reason
─────────────────────────────────────────────────────────────────
EC2      Instance     web-server-old    $142.50  LOW     Stopped 45 days
RDS      DB Instance  test-database     $156.80  HIGH    Stopped 12 days
EC2      EBS Volume   vol-backup-old    $89.20   MEDIUM  Unattached 23 days
ELB      Load Bal     staging-alb       $67.30   MEDIUM  No targets 8 days
Lambda   Function     old-migration     $12.45   LOW     Unused 180 days
```

**Total Monthly Waste: $468.25**
**Potential Annual Savings: $5,619**

## 🛡️ Safety Features

✅ **Read-only by default** - Only scans, doesn't change anything  
✅ **Manual approval** - You choose what to delete  
✅ **Dry-run mode** - Preview changes before executing  
✅ **Risk assessment** - Shows safety level of each action  
✅ **Detailed logging** - Track everything that happens  

## 🚀 Quick Demo (No AWS Required)

Want to see Neeric in action without AWS credentials?

1. **Start Dashboard**: `npm run dev`
2. **Visit**: http://localhost:5174/dashboard
3. **Click**: "Start Scan" (demo data will show)
4. **Explore**: The interface with sample waste data

OR try the CLI demo:
```bash
npm run cli scan  # Shows demo data
```

## 🎯 Common Use Cases

### 1. **Monthly Cost Review**
```bash
# Schedule this monthly
npm run cli scan --format json > waste-report.json
```

### 2. **Pre-Deployment Cleanup**
```bash
# Run before deploying new resources
npm run cli cleanup --dry-run
```

### 3. **Team Dashboard**
```bash
# Leave running for the team
npm run dev
# Share: http://your-server:5174/dashboard
```

### 4. **Automated Cleanup**
```bash
# In CI/CD pipeline
neeric scan --region us-east-1
if [ $? -eq 0 ]; then
  neeric cleanup --region us-east-1
fi
```

## 🔧 Troubleshooting

### Dashboard Won't Start?
```bash
# Check if port is busy
netstat -an | grep 5174

# Kill any process using the port
# Windows: taskkill /F /PID <process_id>
# Mac/Linux: kill -9 <process_id>

# Try again
npm run dev
```

### CLI Not Working?
```bash
# Check Node.js version (need 18+)
node --version

# Reinstall dependencies
npm install

# Test basic command
npm run cli --help
```

### AWS Connection Failed?
1. **Check credentials** - Access Key ID starts with "AKIA"
2. **Check permissions** - IAM user has required policies
3. **Check region** - Make sure region is correct
4. **Check network** - Corporate firewall blocking AWS APIs?

### No Waste Found?
- ✅ **Good news!** Your AWS is clean
- 🔍 **Or:** Try different regions
- 📊 **Or:** Check older resources (>30 days)

## 📞 Getting Help

- **Issues**: [GitHub Issues](https://github.com/neeric/neeric/issues)
- **Email**: hello@neeric.com
- **Discord**: [Join Community](https://discord.gg/neeric)

## 🎉 Success Tips

1. **Start Small**: Test in dev/staging first
2. **Use Dry-Run**: Always preview before cleanup
3. **Check Dependencies**: Some resources depend on others
4. **Monitor Results**: Watch your AWS bill decrease!
5. **Schedule Regular Scans**: Monthly cleanup prevents waste buildup

---

## 🚀 Ready to Save Money?

### Option 1: Web Dashboard
```bash
npm run dev
# Visit: http://localhost:5174/dashboard
```

### Option 2: CLI Tool
```bash
npm run cli scan
```

### Option 3: Just Click
**Windows**: Double-click `start.bat`  
**Mac/Linux**: Run `./start.sh`

**Your AWS bill will thank you!** 💰 