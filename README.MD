### Clone
* Back-End
```bash
   git clone https://bitbucket.org/khaleel/wain_back-end
```
* Front-End
```bash
   cd /wain_back-end
   git clone https://bitbucket.org/khaleel/wain_front-end
```

### Install Dependencies
* [Vagrant](https://www.vagrantup.com/downloads.html)
* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* After the instalation of Vagrant and Virtualbox
```bash
   vagrant up
   npm install webpack -g
   rename wain_front-end public
   cd /public
   npm install
```

### Setup Front-End for Development
```bash
   cd /public
   webpack --watch
```
### Run
```bash
   vagrant ssh
   cd /vagrant
   npm i --no-bin-links
   npm start
```

WHAT TO DO:
    - Edit jwt to use key pair.
    - When removing non-existing item from embedded array no err is thrown.
    - Secure admin CRUD.
    - Make sure user can not change its status manually.
    - Implement the security checks.
    - Make parent of a category a list.
    - Add delete user for admin.