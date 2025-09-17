import React from 'react';
import JsonTable from '../src/JsonTable';

const styles = {
  page: {
    backgroundColor: '#f4f7fb',
    minHeight: '100vh',
    padding: '2.5rem 1.25rem 3rem',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
    color: '#1f2933'
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  title: {
    fontSize: '2.25rem',
    marginBottom: '0.75rem'
  },
  subtitle: {
    fontSize: '1.05rem',
    margin: '0 auto',
    maxWidth: '720px',
    lineHeight: 1.6,
    color: '#52606d'
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    padding: '2rem',
    marginBottom: '2.5rem',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#111827'
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#52606d',
    lineHeight: 1.7
  },
  exampleBody: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  exampleColumn: {
    flex: '1 1 320px',
    minWidth: '280px',
    backgroundColor: '#f8fafc',
    borderRadius: '14px',
    padding: '1.25rem',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)'
  },
  columnTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#334155',
    marginBottom: '0.75rem'
  },
  jsonPreview: {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '12px',
    fontFamily: "'Source Code Pro', 'Fira Code', 'Menlo', monospace",
    fontSize: '0.85rem',
    lineHeight: 1.6,
    overflowX: 'auto',
    margin: 0
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  footer: {
    textAlign: 'center',
    color: '#7b8794',
    fontSize: '0.9rem'
  },
  installGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  installCard: {
    flex: '1 1 220px',
    minWidth: '200px',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '14px',
    padding: '1rem 1.25rem',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)'
  },
  installLabel: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem',
    color: '#94a3b8'
  },
  codeBlock: {
    margin: 0,
    fontFamily: "'Source Code Pro', 'Fira Code', 'Menlo', monospace",
    fontSize: '0.85rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap'
  },
  installHint: {
    marginTop: '1.25rem',
    color: '#52606d',
    fontSize: '0.95rem'
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600
  }
};

const ExampleSection = ({ title, description, json }) => (
  <section style={styles.section}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    <p style={styles.description}>{description}</p>
    <div style={styles.exampleBody}>
      <div style={styles.exampleColumn}>
        <h3 style={styles.columnTitle}>JSON</h3>
        <pre style={styles.jsonPreview}>{JSON.stringify(json, null, 2)}</pre>
      </div>
      <div style={styles.exampleColumn}>
        <h3 style={styles.columnTitle}>Rendered output</h3>
        <div style={styles.tableWrapper}>
          <JsonTable json={json} />
        </div>
      </div>
    </div>
  </section>
);

const InstallSection = () => (
  <section style={styles.section}>
    <h2 style={styles.sectionTitle}>Install in your project</h2>
    <p style={styles.description}>
      Drop <code>JsonTable</code> into any React codebase by installing the published package. Pick the
      package manager that fits your workflow and run one of the commands below.
    </p>
    <div style={styles.installGrid}>
      <div style={styles.installCard}>
        <div style={styles.installLabel}>npm</div>
        <pre style={styles.codeBlock}>npm install @mohsalsaleem/react-json-to-html</pre>
      </div>
      <div style={styles.installCard}>
        <div style={styles.installLabel}>Yarn</div>
        <pre style={styles.codeBlock}>yarn add @mohsalsaleem/react-json-to-html</pre>
      </div>
      <div style={styles.installCard}>
        <div style={styles.installLabel}>pnpm</div>
        <pre style={styles.codeBlock}>pnpm add @mohsalsaleem/react-json-to-html</pre>
      </div>
    </div>
    <p style={styles.installHint}>
      After installing, import <code>JsonTable</code> from{' '}
      <code>@mohsalsaleem/react-json-to-html</code> and pass it the JSON you would like rendered.
    </p>
  </section>
);

const simpleExample = {
  'Server Name': 'alpha-01',
  Description: 'Staging API server used by the mobile team',
  Owner: 'Platform Engineering',
  'Last Updated': '2024-03-18',
  Healthy: true
};

const complexExample = {
  Project: 'Lunar Gateway Migration',
  Status: 'In Progress',
  Owner: {
    Name: 'Nia Carter',
    Email: 'nia.carter@example.com'
  },
  Environments: [
    {
      Name: 'Preview',
      URL: 'https://preview.example.com',
      Services: ['api', 'web', 'worker'],
      'Last Deployment': '2024-03-14T17:22:00Z'
    },
    {
      Name: 'Production',
      URL: 'https://app.example.com',
      Services: ['api', 'web', 'worker', 'reporting'],
      Resources: {
        Region: 'us-east-1',
        Replicas: 6,
        Databases: ['users', 'events', 'metrics']
      },
      'Last Deployment': '2024-03-10T10:04:00Z'
    }
  ],
  Team: {
    Developers: [
      {
        Name: 'Sasha Patel',
        Role: 'Frontend',
        Languages: ['TypeScript', 'GraphQL'],
        'Active Tasks': [
          { ID: 'FE-104', Title: 'Audit log timeline', Due: '2024-03-22' },
          { ID: 'FE-108', Title: 'Responsive layout polish', Due: '2024-03-28' }
        ]
      },
      {
        Name: 'Miguel Herrera',
        Role: 'Backend',
        Languages: ['Go', 'Python'],
        'Active Tasks': [
          { ID: 'BE-87', Title: 'Notifications batching', Due: '2024-03-21' },
          { ID: 'BE-92', Title: 'New billing adapter', Due: '2024-04-02' }
        ]
      }
    ],
    QA: [
      { Name: 'Priya Raman', Focus: 'Automation' },
      { Name: 'Jordan Miles', Focus: 'Accessibility' }
    ]
  },
  Metrics: {
    'Weekly Deploys': 5,
    'Open Bugs': 7,
    'Test Coverage': '87%',
    'Error Rate (24h)': '0.12%'
  }
};

const App = () => (
  <div style={styles.page}>
    <div style={styles.content}>
      <header style={styles.header}>
        <h1 style={styles.title}>@mohsalsaleem/react-json-to-html demo</h1>
        <p style={styles.subtitle}>
          Interactively explore how <code>JsonTable</code> turns plain JSON objects into accessible HTML tables.
          Compare the raw JSON on the left with the rendered markup on the right.
        </p>
      </header>

      <InstallSection />

      <ExampleSection
        title="Simple example"
        description="A minimal JSON payload with a handful of key/value pairs. Perfect for getting a feel for the default rendering."
        json={simpleExample}
      />

      <ExampleSection
        title="Complex example"
        description="A real-world payload that mixes nested objects, arrays of records and primitive values. This highlights how deeply-nested structures are visualised."
        json={complexExample}
      />

      <footer style={styles.footer}>
        Built with <code>@mohsalsaleem/react-json-to-html</code>. View the project on{' '}
        <a style={styles.link} href="https://github.com/mohsalsaleem/react-json-to-html" target="_blank" rel="noreferrer">GitHub</a>{' '}
        or install it via <code>npm install @mohsalsaleem/react-json-to-html</code>.
      </footer>
    </div>
  </div>
);

export default App;
