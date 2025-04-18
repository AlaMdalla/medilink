package esprit.subscription.dao;

import esprit.subscription.Entity.Subs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubsDao extends JpaRepository<Subs, Integer> {

    List<Subs> findByTypesub(String typesub);

    @Query("SELECT s FROM Subs s WHERE s.subsDiscountedPrice < :price")
    List<Subs> findSubscriptionsCheaperThan(@Param("price") Double price);
}

