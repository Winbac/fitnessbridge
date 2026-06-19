"use client";
import { useEffect, useState } from "react";


const [stats, setStats] = useState({
  products: 0,
  members: 0,
  activeMembers: 0,
  orders: 0,
  revenue: 0,
  contacts: 0,
});

useEffect(() => {
  async function fetchDashboardData() {
    try {
      const [
        productsRes,
        membersRes,
        ordersRes,
        contactsRes,
      ] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/members"),
        fetch("/api/orders"),
        fetch("/api/contacts"),
      ]);

      const productsData = await productsRes.json();
      const membersData = await membersRes.json();
      const ordersData = await ordersRes.json();
      const contactsData = await contactsRes.json();

      const products = productsData.data || [];
      const members = membersData.data || [];
      const orders = ordersData.data || [];
      const contacts = contactsData.data || [];

      const activeMembers = members.filter(
        (m: any) => m.status === "ACTIVE"
      ).length;

      const revenue = orders.reduce(
        (sum: number, order: any) =>
          sum + (order.totalAmount || 0),
        0
      );

      setStats({
        products: products.length,
        members: members.length,
        activeMembers,
        orders: orders.length,
        revenue,
        contacts: contacts.length,
      });
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  }

  fetchDashboardData();
}, []);
