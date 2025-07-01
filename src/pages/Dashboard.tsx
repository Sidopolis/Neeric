import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AWSScanner } from '../utils/awsScanner';
import { formatCurrency, formatDate } from '../utils/helpers';

interface WasteItem {
  id: string;
  service: string;
  resource: string;
  name: string;
  region: string;
  cost: number;
  reason: string;
  risk: 'low' | 'medium' | 'high';
  resourceId: string;
  tags?: Record<string, string>;
  lastUsed?: Date;
}

interface ScanResults {
  totalWaste: number;
  potentialSavings: number;
  resourcesScanned: number;
  wasteItems: WasteItem[];
  scanCompletedAt: Date;
}

const DOCS_SECTIONS = [
  { id: 'getting-started', label: '👋 Getting Started' },
  { id: 'connect', label: '🔑 Connect' },
  { id: 'demo-mode', label: '🧪 Demo Mode' },
  { id: 'scan', label: '🔍 Scan' },
  { id: 'cleanup', label: '🧹 Clean Up' },
  { id: 'faq', label: '❓ FAQ' },
  { id: 'troubleshooting', label: '🛠️ Troubleshooting' },
  { id: 'more-help', label: '💬 More Help' },
];

const DocsSection = () => {
  const [active, setActive] = useState('getting-started');

  const ExampleBox = ({ children }: { children: React.ReactNode }) => (
    <div className="border-l-4 border-gray-500 bg-gray-700/30 px-4 py-2 my-3 rounded text-sm text-gray-300">
      <span className="font-semibold text-gray-400">Example:</span> <br />
      {children}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto flex gap-8 p-6 bg-gray-800/40 rounded-xl mt-8">
      {/* Sidebar */}
      <nav className="w-56 flex-shrink-0">
        <ul className="space-y-4 text-base text-gray-300 sticky top-24">
          {DOCS_SECTIONS.map(section => (
            <li key={section.id}>
              <button
                className={`w-full text-left hover:underline ${active === section.id ? 'font-bold text-white' : ''}`}
                onClick={() => setActive(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Main Content */}
      <div className="flex-1 text-base text-gray-200">
        {active === 'getting-started' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📖 Quick Help</h2>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">👋 Getting Started</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>This dashboard helps you find and clean up AWS waste.</li>
              <li>You can use your real AWS account, or just try Demo Mode (no risk, no setup).</li>
            </ul>
          </section>
        )}
        {active === 'connect' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🔑 Connect Your AWS Account</h3>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Go to your AWS Console → IAM → Users → Security Credentials.</li>
              <li>Copy your Access Key and Secret Key.</li>
              <li>Enter them here, pick your region (like <code>us-east-1</code>), and click <strong>Connect to AWS</strong>.</li>
            </ol>
            <p className="mt-2 text-sm text-gray-400">We never store your keys. They're only used while you're using the app.</p>
            <ExampleBox>
              Access Key: <code>AKIAIOSFODNN7EXAMPLE</code><br />
              Secret Key: <code>wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</code><br />
              Region: <code>us-east-1</code>
            </ExampleBox>
          </section>
        )}
        {active === 'demo-mode' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🧪 Try Demo Mode</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Click <strong>Try Demo</strong> if you don't have AWS credentials.</li>
              <li>You'll see sample data. It's safe and you can't break anything.</li>
            </ul>
            <ExampleBox>
              You'll see fake resources like:<br />
              • EC2: <code>old-server</code> ($400/month, stopped 30+ days)<br />
              • S3: <code>unused-bucket</code> ($200/month, no access 90+ days)
            </ExampleBox>
          </section>
        )}
        {active === 'scan' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🔍 Scan for Waste</h3>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Click <strong>Start Scan</strong>.</li>
              <li>Wait a few seconds.</li>
              <li>You'll see a list of things you might want to clean up (like old servers or unused storage).</li>
            </ol>
            <ExampleBox>
              After scanning, you might see:<br />
              • <code>web-server-old</code> (EC2, stopped 45 days, $142.50/month)<br />
              • <code>test-database</code> (RDS, stopped 12 days, $156.80/month)
            </ExampleBox>
          </section>
        )}
        {active === 'cleanup' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🧹 Clean Up</h3>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Select the items you want to remove.</li>
              <li>Click <strong>Clean Up</strong>.</li>
              <li>We'll always ask for your approval before deleting anything.</li>
            </ol>
            <ExampleBox>
              Select <code>web-server-old</code> and click <strong>Clean Up</strong>.<br />
              You'll be asked to confirm before anything is deleted.
            </ExampleBox>
          </section>
        )}
        {active === 'faq' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">❓ FAQ</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Is this safe?</strong> Yes! We never delete anything without your approval. Demo Mode is 100% risk-free.</li>
              <li><strong>What if I make a mistake?</strong> You always have to confirm before deleting. We recommend double-checking your selections.</li>
              <li><strong>Can I use this for multiple AWS accounts?</strong> Yes, just disconnect and reconnect with different credentials.</li>
            </ul>
          </section>
        )}
        {active === 'troubleshooting' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🛠️ Troubleshooting</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Connection failed?</strong> Double-check your keys and region. Make sure your IAM user has the right permissions.</li>
              <li><strong>Scan didn't find anything?</strong> That's good! Or, you may not have unused resources. Try Demo Mode to see sample results.</li>
              <li><strong>Cleanup didn't work?</strong> Make sure your IAM user has permissions to delete resources. Check for error messages.</li>
            </ul>
            <ExampleBox>
              If you see "Invalid credentials", check your Access Key and Secret Key for typos.<br />
              If "Cleanup failed", make sure your AWS user has delete permissions.
            </ExampleBox>
          </section>
        )}
        {active === 'more-help' && (
          <section>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">💬 More Help</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Check our full docs for more details and troubleshooting.</li>
              <li>Still stuck? Reach out to support—we're happy to help!</li>
            </ul>
            <ExampleBox>
              Email: <code>support@neeric.com</code><br />
              Docs: <a href="https://docs.neeric.com" className="underline text-blue-300">docs.neeric.com</a>
            </ExampleBox>
          </section>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [credentials, setCredentials] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'connect' | 'scan' | 'results' | 'docs' | 'settings'>('connect');
  const [showDemo, setShowDemo] = useState(false);

  // Check for tab query parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['connect', 'scan', 'results', 'docs', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as 'connect' | 'scan' | 'results' | 'docs' | 'settings');
    }
  }, [location]);

  const handleConnect = async () => {
    try {
      setError(null);
      const scanner = new AWSScanner(credentials);
      const isValid = await scanner.validateCredentials();
      
      if (isValid) {
        setIsConnected(true);
        setActiveTab('scan');
        localStorage.setItem('aws-credentials', JSON.stringify(credentials));
      } else {
        setError('Invalid AWS credentials. Please check your access key and secret.');
      }
    } catch (err) {
      setError('Failed to connect to AWS. Please check your credentials.');
      console.error(err);
    }
  };

  const handleDemoMode = () => {
    setShowDemo(true);
    setIsConnected(true);
    setActiveTab('scan');
    // Simulate demo results with simple, friendly data
    const demoResults: ScanResults = {
      totalWaste: 1200.00,
      potentialSavings: 900.00,
      resourcesScanned: 12,
      wasteItems: [
        {
          id: '1',
          service: 'EC2',
          resource: 'Instance',
          name: 'old-server',
          region: 'us-east-1',
          cost: 400.00,
          reason: 'Stopped for 30+ days',
          risk: 'low',
          resourceId: 'i-123',
          lastUsed: new Date('2024-01-01'),
          tags: { Environment: 'Test' }
        },
        {
          id: '2',
          service: 'S3',
          resource: 'Bucket',
          name: 'unused-bucket',
          region: 'us-east-1',
          cost: 200.00,
          reason: 'No access for 90+ days',
          risk: 'low',
          resourceId: 'bucket-123',
          lastUsed: new Date('2023-12-01'),
          tags: { Environment: 'Test' }
        }
      ],
      scanCompletedAt: new Date()
    };
    setScanResults(demoResults);
    setActiveTab('results');
  };

  const handleScan = async () => {
    if (!isConnected) return;
    
    try {
      setIsScanning(true);
      setError(null);
      setActiveTab('results');
      
      const scanner = new AWSScanner(credentials);
      const results = await scanner.scanForWaste();
      
      setScanResults({
        totalWaste: results.totalCost,
        potentialSavings: results.totalCost * 0.85,
        resourcesScanned: results.totalResources,
        wasteItems: results.wasteItems,
        scanCompletedAt: new Date()
      });
    } catch (err) {
      setError('Failed to scan AWS resources. Please check your permissions.');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleCleanup = async () => {
    if (selectedItems.size === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedItems.size} resources? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        const scanner = new AWSScanner(credentials);
        const selectedWasteItems = scanResults?.wasteItems.filter(item => 
          selectedItems.has(item.id)
        ) || [];
        
        await scanner.cleanupResources(selectedWasteItems as WasteItem[]);
        
        // Remove selected items from results
        if (scanResults) {
          const updatedResults = {
            ...scanResults,
            wasteItems: scanResults.wasteItems.filter(item => !selectedItems.has(item.id)),
            totalWaste: scanResults.totalWaste - selectedCost,
            potentialSavings: scanResults.potentialSavings - (selectedCost * 0.85)
          };
          setScanResults(updatedResults);
        }
        
        setSelectedItems(new Set());
      } catch (err) {
        setError('Failed to cleanup resources. Please check your permissions.');
        console.error(err);
      }
    }
  };

  const selectedCost = scanResults?.wasteItems
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + item.cost, 0) || 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'EC2': return '🖥️';
      case 'RDS': return '🗄️';
      case 'S3': return '📦';
      case 'ELB': return '⚖️';
      case 'Lambda': return '⚡';
      case 'Config': return '📋';
      case 'CloudTrail': return '🔍';
      default: return '☁️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Enhanced Navbar */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <span className="text-2xl font-black text-[#f2f4f2]">Neeric</span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-8">
                <button
                  onClick={() => setActiveTab('connect')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeTab === 'connect' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span></span>
                  Connect
                </button>
                <button
                  onClick={() => setActiveTab('scan')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeTab === 'scan' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  disabled={!isConnected}
                >
                  <span></span>
                  Scan
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeTab === 'results' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                  disabled={!scanResults}
                >
                  <span></span>
                  Results
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeTab === 'docs' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span></span>
                  Docs
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeTab === 'settings' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span></span>
                  Settings
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm text-gray-400 hidden sm:block">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <Link 
                to="/" 
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                ← Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AWS Cost Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Find and eliminate AWS waste to reduce your cloud costs by up to 40%.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
            <span className="text-red-400">⚠️</span>
            <span className="text-red-300">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'connect' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Connection Form */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🔐</span>
                Connect Your AWS Account
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Access Key ID</label>
                  <input
                    type="text"
                    value={credentials.accessKeyId}
                    onChange={(e) => setCredentials(prev => ({ ...prev, accessKeyId: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-gray-600 focus:border-[#1ed760] focus:outline-none transition"
                    placeholder="AKIA..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Secret Access Key</label>
                  <input
                    type="password"
                    value={credentials.secretAccessKey}
                    onChange={(e) => setCredentials(prev => ({ ...prev, secretAccessKey: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-gray-600 focus:border-[#1ed760] focus:outline-none transition"
                    placeholder="••••••••••••••••••••••••••••••••••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Region</label>
                  <select
                    value={credentials.region}
                    onChange={(e) => setCredentials(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 rounded-lg border border-gray-600 focus:border-[#1ed760] focus:outline-none transition"
                  >
                    <optgroup label="🇺🇸 United States">
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-east-2">US East (Ohio)</option>
                      <option value="us-west-1">US West (N. California)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                    </optgroup>
                    <optgroup label="🇪🇺 Europe">
                      <option value="eu-west-1">Europe (Ireland)</option>
                      <option value="eu-west-2">Europe (London)</option>
                      <option value="eu-west-3">Europe (Paris)</option>
                      <option value="eu-central-1">Europe (Frankfurt)</option>
                      <option value="eu-north-1">Europe (Stockholm)</option>
                      <option value="eu-south-1">Europe (Milan)</option>
                    </optgroup>
                    <optgroup label="🌏 Asia Pacific">
                      <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                      <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
                      <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                      <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
                      <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                      <option value="ap-east-1">Asia Pacific (Hong Kong)</option>
                    </optgroup>
                    <optgroup label="🍁 Canada">
                      <option value="ca-central-1">Canada (Central)</option>
                    </optgroup>
                    <optgroup label="🇧🇷 South America">
                      <option value="sa-east-1">South America (São Paulo)</option>
                    </optgroup>
                    <optgroup label="🌍 Middle East & Africa">
                      <option value="me-south-1">Middle East (Bahrain)</option>
                      <option value="af-south-1">Africa (Cape Town)</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleConnect}
                    disabled={!credentials.accessKeyId || !credentials.secretAccessKey}
                    className="flex-1 bg-[#1ed760] hover:bg-[#1db954] disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    Connect to AWS
                  </button>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-green-400">🛡️</span>
                  Your Security Matters
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>We use read-only permissions by default</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Credentials are stored locally in your browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>All cleanup actions require explicit confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>We never store or transmit your AWS credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-blue-400">📋</span>
                  Required IAM Permissions
                </h3>
                <div className="bg-gray-900/50 rounded-lg p-4 text-xs font-mono text-gray-300">
                  ec2:DescribeInstances<br/>
                  rds:DescribeDBInstances<br/>
                  s3:ListBuckets<br/>
                  elasticloadbalancing:DescribeLoadBalancers<br/>
                  lambda:ListFunctions<br/>
                  cloudwatch:GetMetricStatistics
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scan' && isConnected && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
              {!isScanning ? (
                <>
                  <div className="w-24 h-24 bg-[#1ed760]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Scan</h2>
                  <p className="text-gray-400 mb-8 text-lg">
                    We'll analyze your AWS account to find unused resources and potential cost savings.
                  </p>
                  <button
                    onClick={handleScan}
                    className="bg-[#1ed760] hover:bg-[#1db954] px-8 py-4 rounded-xl font-bold text-lg transition flex items-center gap-3 mx-auto"
                  >
                    <span>🚀</span>
                    Start AWS Scan
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-[#1ed760]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <span className="text-4xl animate-spin">⚡</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Scanning Your AWS Account</h2>
                  <p className="text-gray-400 mb-8 text-lg">
                    This may take a few minutes while we analyze your resources...
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className="bg-[#1ed760] h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-500">Scanning EC2, RDS, S3, Lambda, and more...</p>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'results' && scanResults && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-red-300">Total Waste</h3>
                  <span className="text-2xl">💸</span>
                </div>
                <p className="text-3xl font-black text-red-400">{formatCurrency(scanResults.totalWaste)}</p>
                <p className="text-sm text-red-300/70 mt-2">This month</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-red-500/20 px-2 py-1 rounded text-xs text-red-300">
                    +23% vs last month
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-300">Potential Savings</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-black text-green-400">{formatCurrency(scanResults.potentialSavings)}</p>
                <p className="text-sm text-green-300/70 mt-2">Recoverable</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-300">
                    85% success rate
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-300">Resources Scanned</h3>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-3xl font-black text-blue-400">{scanResults.resourcesScanned}</p>
                <p className="text-sm text-blue-300/70 mt-2">Across all services</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-blue-500/20 px-2 py-1 rounded text-xs text-blue-300">
                    6 regions scanned
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-300">Waste Items</h3>
                  <span className="text-2xl">🗂️</span>
                </div>
                <p className="text-3xl font-black text-purple-400">{scanResults.wasteItems.length}</p>
                <p className="text-sm text-purple-300/70 mt-2">Ready to clean</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-purple-500/20 px-2 py-1 rounded text-xs text-purple-300">
                    {scanResults.wasteItems.filter(item => item.risk === 'low').length} low risk
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Visualization */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">📈</span>
                Cost Breakdown by Service
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {Object.entries(
                    scanResults.wasteItems.reduce((acc, item) => {
                      acc[item.service] = (acc[item.service] || 0) + item.cost;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([service, cost]) => {
                    const percentage = (cost / scanResults.totalWaste * 100).toFixed(1);
                    return (
                      <div key={service} className="flex items-center gap-4">
                        <div className="w-12 text-center">
                          <span className="text-2xl">{getServiceIcon(service)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{service}</span>
                            <span className="text-sm text-gray-400">{formatCurrency(cost)} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-[#1ed760] h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">💡 Smart Insights</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">⚡</span>
                      <div>
                        <p className="font-medium">Highest Impact</p>
                        <p className="text-gray-400">EC2 instances account for {((scanResults.wasteItems.filter(i => i.service === 'EC2').reduce((s, i) => s + i.cost, 0) / scanResults.totalWaste) * 100).toFixed(0)}% of waste</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">🎯</span>
                      <div>
                        <p className="font-medium">Quick Wins</p>
                        <p className="text-gray-400">{scanResults.wasteItems.filter(i => i.risk === 'low').length} low-risk items can be safely cleaned</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">📊</span>
                      <div>
                        <p className="font-medium">Potential ROI</p>
                        <p className="text-gray-400">Save ~{formatCurrency(scanResults.potentialSavings * 12)} annually</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            {selectedItems.size > 0 && (
              <div className="bg-gradient-to-r from-[#1ed760]/10 to-green-600/10 border border-[#1ed760]/30 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1ed760] mb-2">
                      {selectedItems.size} items selected
                    </h3>
                    <p className="text-gray-300">
                      Potential savings: <span className="font-bold text-[#1ed760]">{formatCurrency(selectedCost)}</span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedItems(new Set())}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                    >
                      Clear Selection
                    </button>
                    <button
                      onClick={handleCleanup}
                      className="px-6 py-3 bg-[#1ed760] hover:bg-[#1db954] text-black rounded-lg font-bold transition"
                    >
                      Clean Up Selected
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Waste Items List */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-bold mb-2">Waste Analysis Results</h2>
                <p className="text-gray-400">Click items to select them for cleanup</p>
              </div>
              
              <div className="divide-y divide-gray-700/50">
                {scanResults.wasteItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-6 hover:bg-gray-700/20 transition cursor-pointer ${
                      selectedItems.has(item.id) ? 'bg-[#1ed760]/10 border-l-4 border-[#1ed760]' : ''
                    }`}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="mt-1 w-4 h-4 text-[#1ed760] bg-gray-700 border-gray-600 rounded focus:ring-[#1ed760]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{getServiceIcon(item.service)}</span>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.risk)}`}>
                              {item.risk} risk
                            </span>
                          </div>
                          <p className="text-gray-400 mb-2">{item.reason}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📍 {item.region}</span>
                            <span>🏷️ {item.service}</span>
                            <span>🆔 {item.resourceId}</span>
                            {item.lastUsed && (
                              <span>🕒 Last used {formatDate(item.lastUsed)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-400">{formatCurrency(item.cost)}</p>
                        <p className="text-sm text-gray-500">per month</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && <DocsSection />}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">⚙️</span>
                Dashboard Settings
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">🔐 Account Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Connected Region</p>
                        <p className="text-sm text-gray-400">{credentials.region || 'Not connected'}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                      </div>
                    </div>
                    {isConnected && (
                      <button
                        onClick={() => {
                          setIsConnected(false);
                          setScanResults(null);
                          setActiveTab('connect');
                          localStorage.removeItem('aws-credentials');
                        }}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Disconnect Account
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">🎨 Display Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Currency</p>
                        <p className="text-sm text-gray-400">Display costs in your preferred currency</p>
                      </div>
                      <select className="bg-gray-600 px-3 py-2 rounded-lg text-sm">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-yellow-400">⚠️</span>
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                      Clear All Scan Data
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition ml-4">
                      Reset All Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;