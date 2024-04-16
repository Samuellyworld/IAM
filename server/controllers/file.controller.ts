import { Request, Response } from "express";
import { uploadToFirebase, fetchFileFromFirebase } from "./cloud/cloud";
import fs from "fs";
import axios from "axios";

import { File } from "../models/File";
import {
  createFile,
  getAllFiles,
  getFileById,
  updateFile,
  deleteFileById,
} from "../services/file.service";
import { createLog } from "../services/log.service";
import { defaultConfig } from "../config/config";

// Controller function to create a new file
const createFileController = async (req: Request, res: Response) => {
  try {
    const { file_name, file_size, folder_id, category_id, description } =
      req.body;
    const file = req.file;
    const user_id = req.user_id;

    if (!file || !file_name || !file_size) {
      return res
        .status(400)
        .json({ message: "File, file_name, file_size are required" });
    }

    let cloudUrl = "";

    const firebaseUrl = await uploadToFirebase(file.path, file_name);
    cloudUrl = firebaseUrl;

    const newFile: File = {
      id: 1,
      user_id: Number(user_id),
      folder_id: folder_id,
      category_id: category_id,
      file_name: file_name,
      file_size: file_size,
      description: description,
      cloud_url: cloudUrl,
    };

    await createFile(newFile);

    await createLog({
      id: 1,
      user_id: Number(user_id),
      action_taken: `Created File ${file_name}`,
      file_id: null,
    });

    // Clean up the local file
    fs.unlinkSync(file.path);

    res
      .status(200)
      .json({ message: "File created Successfully", file_name, cloudUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(400).json({ message: "Error uploading file" });
  }
};

// Controller function to get all files
const getAllFilesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = await getAllFiles();

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching all files:", error);
    res.status(500).send("Internal server error");
  }
};

// Controller function to get a file by ID
const getFileController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user_id;

    // Check if fileId is provided
    if (!id) {
      return res.status(400).json({ message: "File ID is required" });
    }
    const file = await getFileById(Number(id));

    // Check if file exists
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Fetch the file from Firebase Storage
    const filePath = await fetchFileFromFirebase(file.file_name);

    // Send the file to the client
    res.download(filePath, file.file_name);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a file
const updateFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.file) {
      const firebaseUrl = await uploadToFirebase(
        req.file.path,
        req.body.file_name
      );

      req.body.cloud_url = firebaseUrl;
    }
    const fileId: number = parseInt(req.params.id, 10);
    const updatedFile: File = req.body;
    await updateFile(fileId, updatedFile);
    res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a file by ID
const deleteFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fileId: number = parseInt(req.params.id, 10);
    await deleteFileById(fileId);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createFileController,
  getAllFilesController,
  getFileController,
  updateFileController,
  deleteFileController,
};