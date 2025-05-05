Se cere realizarea unei aplicatii (desktop sau web) cu arhitectura stratificata (presentation, business
logic, data access), conform cerintelor problemei asignate/alese. Limbajul de implementare va fi un
limbaj orientat obiect, la alegere dintre cele deja studiate. Interfata cu utilizatorul se recomanda a fi
realizata cu un instrument vizual (ex. NetBeans, WindowBuilder, Visual Studio). Se cere aplicarea
sablonului arhitectural MVC (Model-View-Controller). Aplicatia trebuie sa exploateze o baza de date
relationala prin stratul de data access. Se impune ca interactiunea cu baza de date sa se faca prin
intermediul unei biblioteci ORM (Object-Relational Mapping, ex. Hibernate/EclipseLink,
NHibernate/Entity Framework). Proiectul trebuie sa ofere functii de tip CRUD (Create-Read-UpdateDelete) pentru cel putin o entitate din domeniul problemei (clasa din Model).
Obligatoriu, toate modelele UML ale aplicației (functional, structurale, comportamentale) vor fi
construite cu ajutorul unui instrument CASE (Computer Aided Software Engineering, ex. StarUML)
și vor fi incluse în cadrul aceluiasi proiect, structurat adecvat, conform etapelor ciclului de viața al
unui sistem soft (pentru a putea urmări aspecte legate de sincronizare). Implementarea claselor din
pachetul Model poate fi realizata partial folosind o operatie de tip forward/direct engineering, aplicata
cu ajutorul instrumentului CASE folosit.

 
   O firma si-a creat o infrastructura prin care seful monitorizeaza angajatii prezenti la lucru si le traseaza
   sarcini individuale. Firma are o aplicatie care ofera:
   
• o fereastra pentru sef, cu ajutorul careia seful vede lista angajatilor prezenti în firma, un
   element din lista precizând numele angajatului si ora la care s-a logat în sistem. De asemenea,
   seful poate transmite o sarcina unui angajat prezent astfel: selecteaza angajatul din lista,
   introduce o descriere a sarcinii si declanseaza un buton "transmite sarcina". Imediat dupa
   transmiterea unei sarcini, aceasta poate fi consultata de catre angajatul respectiv.
  
 • câte o fereastra pentru fiecare angajat: Atunci când angajatul vine la serviciu, introduce ora
   sosirii si declanseaza un buton "prezent". Imediat dupa declansarea butonului, seful vede în
   lista lui ca angajatul este prezent. În continuare, cât timp angajatul sta la serviciu, el primeste
   si, în consecinta, vede în fereastra lui, sarcinile transmise de sef. La plecare, angajatul închide
   fereastra, moment în care seful este notificat de delogarea acestuia din sistem. 