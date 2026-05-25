const cloudinary = require("../Configs/cloudinary.js")
const Doc = require("../Models/Docs.js")


async function createDoc(req, res) {
    try{
        if(!req.file) return res.status(400).json({error: "Image file required"});
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {folder: "kyc"});
        const {BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph} = req.body;
        const document = await Doc.createDoc({
            BusinessCertificate,
            PinCertificate,
            NationalId,
            PassportCertificate,
            BankAccountStatement,
            BusinessPremisePhotograph,
            imageUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id
        });
        res.status(201).json(document);

    }catch (err) {
        res.status(500).json({error: err.message})
        console.log(err)
    }
}


async function getDocuments(req, res) {
    try{
        const documents = await Doc.getAllDocs()
        res.json(documents)
    }catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function getProductById(req, res) {
    try{
        const document = await Doc.getdocById(req.params.id);
        if(!document) return res.status(404).json({error: "Document Not found"});
        res.json(document);
    }catch (err) {
        res.status(403).json({error: err.message})
    }
}


async function updateProduct(req, res) {
    try{
        const {BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph} = req.body;
        let updates = {BusinessCertificate, PinCertificate, NationalId, PassportCertificate, BankAccountStatement, BusinessPremisePhotograph};
        if(req.file) {
            const existing = await Doc.getdocById(req.params.id);
            if(existing?.publicId) await cloudinary.uploader.destroy(existing.public_id);

            const uploadResult = await cloudinary.uploader.upload(req.file.path, {folder: "kyc"});
            updates.imageUrl = uploadResult.secure_url;
            updates.publicId = uploadResult.public_id;
        } else {
            const existing = await Doc.getdocById(req.params.id);
            updates.imageUrl = existing.image_url;
            updates.publicId = existing.public_id;
        }

        const updated = await Doc.updateDoc(req.params.id, updates);
        res.json(update);

    }catch (err) {
        res.status(403).json({error: err.message})
    }
}

async function deleteDoc(req, res)