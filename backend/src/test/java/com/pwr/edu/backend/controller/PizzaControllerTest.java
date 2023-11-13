package com.pwr.edu.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pwr.edu.backend.domain.dto.PizzaDto;
import com.pwr.edu.backend.domain.pizza.Ingredients;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.pizza.PizzaBuilder;
import com.pwr.edu.backend.service.PizzaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PizzaControllerTest {

    MockMvc mockMvc;

    @Mock
    PizzaService pizzaService;

    @InjectMocks
    PizzaController pizzaController;

    private JacksonTester<Pizza> jsonSuperHero;

    @BeforeEach
    void setUp() {
        JacksonTester.initFields(this, new ObjectMapper());
        mockMvc = MockMvcBuilders.standaloneSetup(pizzaController)
                .build();
    }

    @Test
    void createPizza() throws Exception {

        Pizza pizzaUnderTest = new PizzaBuilder()
                .withDough("ITALIAN")
                .withName("under test")
                .withSauce("TOMATO")
                .withSize("LARGE")
                .withIngredients(List.of(Ingredients.valueOf("HAM"), Ingredients.valueOf("BACON")))
                .build();

        MockHttpServletResponse response = mockMvc.perform(
                post("http://localhost:8080/api/v1/pizza/create").contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer 123-321-123-321")
                        .content(
                        jsonSuperHero.write(pizzaUnderTest).getJson()
                )).andReturn().getResponse();

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getAllPizzas() throws Exception {
        PizzaDto pizza1 = new PizzaDto();
        PizzaDto pizza2 = new PizzaDto();
        pizza1.setId(1L);
        pizza2.setId(2L);
        List<PizzaDto> pizzaList = List.of(pizza1, pizza2);
        when(pizzaService.findAllPizza()).thenReturn(pizzaList);

        mockMvc.perform(get("/api/v1/pizza/all"))
                .andExpect(status().isOk());

        verify(pizzaService, times(1)).findAllPizza();
    }

    @Test
    void getPizzaById() throws Exception {
        Pizza pizza1 = new Pizza();
        pizza1.setId(1L);
        when(pizzaService.findPizzaById(anyLong())).thenReturn(pizza1);

        mockMvc.perform(get("/api/v1/pizza/1"))
                .andExpect(status().isOk());

        verify(pizzaService, times(1)).findPizzaById(anyLong());
    }
}