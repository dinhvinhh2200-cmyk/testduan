import { Request, Response } from "express";
import pool from "../config/database";
import * as userModel from "../models/userModel";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, email, password } = req.body;

    // 1 kiem tra email va password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "vui long nhap day du email va password",
      });
      return;
    }

    const user = await userModel.findUserByEmail(email);

    if (user?.name !== name) {
      res.status(401).json({
        success: false,
        message: 'Name không tồn tại trên hệ thống'
      })
      return
    }

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Email nay ko ton tai tren he thong",
      });
      return;
    }

    if (user.password !== password) {
      res
        .status(401)
        .json({ success: false, message: "Mat khau khong chinh xac" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "dang nhap thanh cong",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
  }
};
