import { Request, Response } from "express";
import * as userModel from "../models/userModel";

// hàm xử lí login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1 kiem tra email va password
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "vui long nhap day du email va password",
      });
      return;
    }

    const user = await userModel.findUserByEmail(email);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Email nay ko ton tai tren he thong",
      });
      return;
    }

    if (user.name !== name) {
      res.status(401).json({
        success: false,
        message: "Name không tồn tại trên hệ thống",
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

// hàm xử lí đăng kí 
export const register = async (req: Request, res: Response): Promise<void> => {
  try {

    const {name, email, password} = req.body
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin'
      })
      return
    }

    const checkUser = await userModel.findUserByEmail(email)
    if (checkUser) {
      res.status(400).json({
        success: false,
        message: 'Email này đã tồn tại vui lòng nhập email khác'
      })
      return
    }

    // gọi models xử lí db
    const newUserId = await userModel.createUser({name, email, password})
    res.status(201).json({
      success: true,
      message: 'Đăng kí thành công',
      newUserId: newUserId
    })

  } catch (error) {
    console.log('Lỗi', error)
    res.status(500).json({
      success: false,
      message: 'Đăng kí thất bại lỗi sever'
    })
  }
}
