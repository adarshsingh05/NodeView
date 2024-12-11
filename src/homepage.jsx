import React, { useState, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MarkerType,
} from "react-flow-renderer";
import LeftSidebar from "./leftsidebar";


const Apps = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]); // Start with no edges
  const [selectedNode, setSelectedNode] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState("");
  const [wid, setWid] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);

  // Fetch wallet and transaction data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch wallet data
        const walletResponse = await fetch("https://node-backend-jb9i.onrender.com/wallets/all");
        const wallets = await walletResponse.json();

        // Generate random positions for nodes
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const maxRadius = Math.min(window.innerWidth, window.innerHeight) / 2; // Set max position radius
        const walletNodes = wallets.map((wallet) => {
          const randomX = Math.random() * window.innerWidth; // Random X position
          const randomY = Math.random() * window.innerHeight; // Random Y position

          return {
            id: `${wallet.id}`, // Node ID
            data: { label: wallet.label },
            balance: wallet.balance,
            position: {
              x: randomX, // Random X position
              y: randomY, // Random Y position
            },
            draggable: true, // Enable dragging for ReactFlow nodes
            style: {
              background: "yellow",
              color: "black",
              border: "2px solid blue",
              width: 40, // Smaller width
              height: 40, // Smaller height
              borderRadius: "50%",
              textAlign: "center",
              fontSize: "10px",
            },
          };
        });

        setNodes(walletNodes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch transaction data for a specific node
  const fetchTransactions = async (walletId) => {
    try {
      const transactionResponse = await fetch(
        `https://node-backend-jb9i.onrender.com/wallets/noder/${walletId}`
      );
      const transactions = await transactionResponse.json();

      // Count incoming and outgoing transactions
      const incoming = transactions.filter(
        (transaction) => transaction.to === walletId
      ).length;
      const outgoing = transactions.filter(
        (transaction) => transaction.from === walletId
      ).length;

      // Update the state with the counts
      setIncomingCount(incoming);
      setOutgoingCount(outgoing);

      // Create edges based on transactions
      const walletEdges = transactions.map((transaction) => ({
        id: `e${transaction.from}-${transaction.to}`,
        source: `${transaction.from}`,
        target: `${transaction.to}`,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
        },
        style: {
          stroke: transaction.to === walletId ? "green" : "red", // Green for incoming, red for outgoing
          strokeWidth: 2,
        },
      }));

      setEdges(walletEdges);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Handle node click: update edges and sidebar
  const handleNodeClick = (event, node) => {
    if (selectedNode === node.id) {
      setSelectedNode(null);
      setWalletName("");
      setSidebarVisible(false);
      setEdges([]); // Clear edges when deselecting the node
      setBalance(""); // Clear balance when deselecting the node
    } else {
      setSelectedNode(node.id);
      setWid(node.id);
      setWalletName(node.data.label);
      setBalance(node.balance); // Set the balance here
      setSidebarVisible(true);

      // Fetch and show transaction edges for the clicked wallet
      fetchTransactions(node.id);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
    setSelectedNode(null);
    setEdges([]); // Clear edges when sidebar is closed
  };

  const Sidebar = ({
    walletName,
    wid,
    onClose,
    balance,
    incomingCount,
    outgoingCount,
  }) => {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "12px",
            width: "calc(200px - 40px)",
            height: "calc(90vh - 60px)",
            backgroundColor: "black",
            padding: "20px",
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.5)",
            marginTop: "25px",
            border: "3px solid #2e2e2e",
            borderRadius: "20px",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <style>
            {`
      div h2 {
        margin-left: 25px;
        color: white; /* Blue color */
        font-size: 1rem; /* Larger text */
        font-weight: 600; /* Semi-bold */
        font-family: 'Mono', monospace; /* Monospace font */
      }
    `}
            {`
      div span {
        color: white; /* Blue color */
        font-size: 0.7rem; /* Larger text */
        font-weight: 600; /* Semi-bold */
        font-family: 'Mono', monospace; /* Monospace font */
      }
    `}
            {`
      div p {
        color: #a0aec0; /* Blue color */
        font-size: 0.7rem; /* Larger text */
        font-weight: 600; /* Semi-bold */
        font-family: 'Mono', monospace; /* Monospace font */
      }
    `}
            {`
      div svg {
       margin-right: 10px;
      }
    `}
          </style>
          <h2 className="text-blue-500 text-xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#FFFFFF"
              marginRight="10px"
            >
              <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
            </svg>
            Wallet Data
          </h2>
          <p>
            <strong className="text-blue-500">Wallet Name:</strong>{" "}
            <span>{walletName}</span>
          </p>
          <p>
            <strong>Wallet ID:</strong>{" "}
            <span className="wallet-id">{wid.substring(0, 4)}****</span>
          </p>
          <p>
            <strong>Wallet Balance:</strong> {balance || 0} <span>ETH</span>
          </p>
          <p>
            <strong>Total Transactions:</strong>{" "}
            <span>{incomingCount + outgoingCount}</span>
          </p>
          <p>
            <strong>Incoming Transactions:</strong> <span>{incomingCount}</span>
          </p>
          <p>
            <strong>Outgoing Transactions:</strong> <span>{outgoingCount}</span>
          </p>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              color: "white",
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            &times;
          </button>

          <style>
            {`
      .wallet-id {
        position: relative;
        display: inline-block;
      }
      .wallet-id:hover::after {
        content: '${wid}';
        position: absolute;
        top: -4px;
        cursor: pointer;
        left: 0;
        size: 0.2rem;
        color: white;
        background-color: black;
        padding: 5px;
        border-radius: 5px;
        white-space: nowrap;
        display: block;
      }
    `}
          </style>
          <div
            style={{
              color: "White",
              marginTop: "20px",
              
              font: "Mono",
              textAlign: "center",
              textJustify: "center",
              height: "30px",
              width: "160px",
              fontSize: "11px",
              backgroundColor: "#1b1b1b",
              border: "1px solid white",
              borderRadius: "10px",
              
            }}
          >
            <style>
                {`
                  .strongss {
                  margin-right: 10px;
                  margin-top: 400px;
                  color: #bc3326;
                  }
                `}
            </style>

            <div>Tagged IP Address</div>
            <strong className="strongss">123.456.789.009</strong>
          </div>
        </div>
      </div>
    );
  };

  // Callback to handle node dragging
  const onNodeDrag = (event, node) => {
    const updatedNodes = nodes.map((n) =>
      n.id === node.id ? { ...n, position: node.position } : n
    );
    setNodes(updatedNodes);
  };

  // Handle search functionality
  const handleSearch = () => {
    const foundNode = nodes.find(
      (node) =>
        node.id.toLowerCase() === searchQuery.toLowerCase() ||
        node.data.label.toLowerCase() === searchQuery.toLowerCase()
    );
    if (foundNode) {
      setSelectedNode(foundNode.id);
      setWid(foundNode.id);
      setWalletName(foundNode.data.label);
      setSidebarVisible(true);
      fetchTransactions(foundNode.id);
    } else {
      alert("No wallet found with the given ID or Name.");
    }
  };

  return (
    <ReactFlowProvider>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#121212" }}
      >
        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            top: "2px",
            left: "24%",
            zIndex: 1000,
            width: "70%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            className="items-center justify-center"
            
            placeholder="Search Wallet by Name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #0000FF",
              marginRight: "10px",
              
              width: "calc(100% - 120px)", // Adjust input width to leave space for the button
            }}

          />
          <button
  style={{
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "white",
    fontSize: "16px",
    color: "blue",
    border: "none",
    cursor: "pointer",
    width: "100px", // Fixed width for the button
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "blue";
    e.target.style.color = "white";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.color = "blue";
  }}
  onClick={handleSearch }
>
  Search
</button>

        </div>
        

        {loading ? (
          <div
            style={{ color: "white", textAlign: "center", marginTop: "20%" }}
          >
            Loading wallets...
          </div>
        ) : (
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              style: {
                ...node.style,
                background: node.id === selectedNode ? "white" : "yellow",
                boxShadow:
                  node.id === selectedNode ? "0 0 15px 5px blue" : "none", // Add glow effect for selected node
              },
            }))}
            edges={edges} // Show edges dynamically when a node is selected
            fitView
            style={{ background: "#121212", color: "white" }}
            onNodeClick={handleNodeClick}
            onNodeDrag={onNodeDrag} // Handle the drag event
            draggable // Enable ReactFlow's built-in node dragging
          >
            <Background color="#444" gap={16} />
            <Controls />
          </ReactFlow>
        )}
        {sidebarVisible && (
          <Sidebar
            walletName={walletName}
            wid={wid}
            balance={balance}
            incomingCount={incomingCount}
            outgoingCount={outgoingCount}
            onClose={handleCloseSidebar}
          />
        )}
      </div>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "#121212" }}>
        {/* Left Sidebar */}
        <LeftSidebar />
        </div>
    </ReactFlowProvider>
  );
};

export default Apps;
