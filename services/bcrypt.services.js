import bcrypt from 'bcrypt';

class bcryptServices {

    constructor() {
        
    }
 
  static async hashPassword(password) {
    return await bcrypt.hash(password, 11);
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
    
}

export default bcryptServices;