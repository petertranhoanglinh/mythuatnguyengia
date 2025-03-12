import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Component({
  selector: 'app-metamask-connect',
  templateUrl: './metamask-connect.component.html',
  styleUrls: ['./metamask-connect.component.css']
})
export class MetamaskConnectComponent implements OnInit {
  account: string | null = null;
  isMetaMaskInstalled = false;

  ngOnInit(): void {
    this.checkMetaMaskConnection();
  }

  async checkMetaMaskConnection() {
    if (window.ethereum) {
      this.isMetaMaskInstalled = true;
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.account = accounts[0];
      }
    } else {
      this.isMetaMaskInstalled = false;
    }
  }

  async connectMetaMask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
      } catch (error) {
        console.error("Người dùng từ chối kết nối", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  }

  disconnectMetaMask() {
    this.account = null;
  }
}
