
export function styleSetup(){
  const style = document.createElement("style");
  style.innerHTML = `
    .ios-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .ios-box {
      background: #fff;
      border-radius: 14px;
      width: 280px;
      text-align: center;
      overflow: hidden;
      animation: fadeIn 0.2s ease;
    }

    .ios-title {
      font-weight: 600;
      padding: 16px 10px 5px;
      font-size: 16px;
    }

    .ios-message {
      padding: 0 15px 15px;
      font-size: 14px;
      color: #555;
    }

    .ios-buttons {
      display: flex;
      border-top: 1px solid #ddd;
    }

    .ios-buttons button {
      flex: 1;
      padding: 12px;
      border: none;
      background: none;
      font-size: 16px;
      cursor: pointer;
    }

    .ios-buttons button:not(:last-child) {
      border-right: 1px solid #ddd;
    }

    .ios-confirm {
      color: #007AFF;
      font-weight: 600;
    }

    .ios-cancel {
      color: #ff3b30;
    }

    .ios-loading {
      width: 50px;
      height: 50px;
      border: 4px solid #ddd;
      border-top: 4px solid #007AFF;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 30px auto;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

  function createOverlay(content) {
    const overlay = document.createElement("div");
    overlay.className = "ios-overlay";
    overlay.innerHTML = content;
    document.body.appendChild(overlay);
    return overlay;
  }

  // 1️⃣ Confirm Alert
 export function confirmBox(title, message) {
    return new Promise((resolve) => {
      const overlay = createOverlay(`
        <div class="ios-box">
          <div class="ios-title">${title}</div>
          <div class="ios-message">${message}</div>
          <div class="ios-buttons">
            <button class="ios-cancel">Cancel</button>
            <button class="ios-confirm">OK</button>
          </div>
        </div>
      `);

      overlay.querySelector(".ios-cancel").onclick = () => {
        overlay.remove();
        resolve(false);
      };

      overlay.querySelector(".ios-confirm").onclick = () => {
        overlay.remove();
        resolve(true);
      };
    });
  }

  // 2️⃣ Popup Alert
 export function popup(title, message) {
    const overlay = createOverlay(`
      <div class="ios-box">
        <div class="ios-title">${title}</div>
        <div class="ios-message">${message}</div>
        <div class="ios-buttons">
          <button class="ios-confirm">OK</button>
        </div>
      </div>
    `);

    overlay.querySelector("button").onclick = () => {
      overlay.remove();
    };
  }

  // 3️⃣ Loading
  export function loading(show = true) {
    let loader = document.querySelector(".ios-loading-overlay");

    if (show) {
      if (loader) return;
      loader = document.createElement("div");
      loader.className = "ios-overlay ios-loading-overlay";
      loader.innerHTML = `<div class="ios-loading"></div>`;
      document.body.appendChild(loader);
    } else {
      loader && loader.remove();
    }
  }