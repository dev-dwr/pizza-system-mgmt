# Systemy Webowe - Projekt Pizzeria

## Opis projektu
W Polsce popyt na pizzerie stale się zwiększa. Wielkie lokale otrzymują ogromne liczby zamówień i nie są w stanie nimi efektywnie zarządzać bez odpowiednich narzędzi. Nasz system zarządzania zamówieniami został stworzony z myślą o tych wyzwaniach.

## Funkcjonalności
- Rejestracja i logowanie dla użytkowników i pracowników
- Składanie zamówień przez użytkownika
- Śledzenie przebiegu zamówienia przez użytkownika
- Odebranie i aktualizacja statusu zamówienia przez pracownika
- Powiadomienia e-mailowe

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Mail
- Spring JPA
- Hibernate
- Lombok
- MySQL - baza danych
- Testy jednostkowe/integracyjne

### Aplikacja Webowa
- JSX(HTML)
- CSS
- JavaScript
- React
- Axios
- MailDev

## Role w systemie
1. **Użytkownik**: 
   - Rejestracja, logowanie
   - Składanie zamówień
   - Śledzenie statusu zamówienia
   - Otrzymywanie powiadomień e-mail
2. **Pracownik**:
   - Odebranie zamówienia
   - Aktualizacja statusu zamówienia
   - Wysyłanie powiadomienia o zmianie statusu

## Wymagania funkcjonalne
1. **Rejestracja i logowanie**: 
   - Rejestracja nowego użytkownika z podaniem imienia, nazwiska, adresu e-mail i hasła
   - Logowanie dla zarejestrowanych użytkowników na podstawie adresu e-mail i hasła
2. **Składanie zamówień**: 
   - Wybór pizzy z menu z opisami i cenami
   - Dodawanie dodatków do pizzy
3. **Śledzenie zamówienia**:
   - Wyświetlanie aktualnego statusu zamówienia
   - Otrzymywanie powiadomień e-mail o zmianie statusu
4. **Interfejs dla pracowników**:
   - Przeglądanie nowych zamówień
   - Aktualizacja statusu zamówienia przez kolejne etapy jego realizacji
5. **Powiadomienia e-mail**:
   - Potwierdzenie rejestracji
   - Potwierdzenie złożenia zamówienia
   - Informacja o zmianie statusu zamówienia

## Wymagania niefunkcjonalne
1. **Bezpieczeństwo**:
   - Szyfrowanie hasła użytkownika
   - Bezpieczne połączenie SSL
   - Mechanizmy zapobiegające atakom (SQL injection, XSS)
2. **Responsywność**:
   - Dostosowanie interfejsu do różnych rozmiarów ekranów i urządzeń
3. **Intuicyjność**:
   - Prosty i intuicyjny interfejs

## Proces działania systemu
1. **Rejestracja użytkownika**:
   - Wprowadzenie danych (imię, nazwisko, adres e-mail, hasło)
   - Weryfikacja danych przez system
   - Utworzenie konta i wysłanie potwierdzenia e-mail
2. **Logowanie użytkownika**:
   - Wprowadzenie adresu e-mail i hasła
   - Weryfikacja danych przez system
   - Dostęp do konta
3. **Składanie zamówienia**:
   - Wybór pizzy z menu
   - Potwierdzenie zamówienia przez użytkownika
   - Rejestracja zamówienia przez system i wysłanie potwierdzenia e-mail
4. **Śledzenie przebiegu zamówienia**:
   - Logowanie na konto
   - Wyświetlanie statusu zamówienia przez system
5. **Odebranie zamówienia przez pracownika**:
   - Logowanie do systemu
   - Wyświetlanie listy oczekujących zamówień przez system
   - Akceptacja zamówienia przez pracownika
6. **Aktualizacja statusu zamówienia przez pracownika**:
   - Po przygotowaniu pizzy, aktualizacja statusu przez pracownika
   - Automatyczne powiadomienie użytkownika przez system o zmianie statusu za pomocą e-maila
