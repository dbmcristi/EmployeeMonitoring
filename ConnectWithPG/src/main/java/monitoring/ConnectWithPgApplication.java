package monitoring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"monitoring"})
public class ConnectWithPgApplication implements CommandLineRunner {

    public static void main(String[] args)  {
        SpringApplication.run(ConnectWithPgApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
